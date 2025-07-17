import {
  assertInInjectionContext,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  OverlaySizeConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DragDropRegistry } from '@angular/cdk/drag-drop';
import {
  BehaviorSubject,
  delay,
  EMPTY,
  filter,
  map,
  of,
  repeat,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { isElement } from '@mixin-ui/cdk/utils';

export type XPopoverDirection = 'horizontal' | 'vertical' | 'both';
export type XPopoverPosition = 'top' | 'end' | 'bottom' | 'start';
export type XPopoverAlign = 'start' | 'center' | 'end';

export interface XPopoverPositionOptions {
  readonly direction: XPopoverDirection;
  readonly position: XPopoverPosition;
  readonly align: XPopoverAlign;
  readonly offset: number;
  readonly fixed: boolean;
}

export function createPopover(injector?: Injector): XPopoverImpl {
  if (!injector) {
    assertInInjectionContext(createPopover);
  }
  return runInInjectionContext(injector || inject(Injector), () => new XPopoverImpl());
}

export class XPopoverImpl {
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #cdk = inject(Overlay);
  readonly #vcr = inject(ViewContainerRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #dragDrop = inject(DragDropRegistry);
  readonly #openChanges = new BehaviorSubject(false);
  readonly #refEnables = this.#openChanges.pipe(
    switchMap(open => (open && this.#ref ? of(this.#ref) : EMPTY))
  );

  readonly openChanges = this.#openChanges.asObservable();

  readonly positionChanges = this.#refEnables.pipe(
    switchMap(ref =>
      coerceStrategy(ref).positionChanges.pipe(map(event => fromCdkPosition(event.connectionPair)))
    )
  );

  readonly keydownEvents = this.#refEnables.pipe(switchMap(ref => ref.keydownEvents()));

  readonly backdropEvents = this.#refEnables.pipe(switchMap(ref => ref.backdropClick()));

  readonly outsidePointerEvents = this.#refEnables.pipe(
    switchMap(ref =>
      ref.outsidePointerEvents().pipe(
        filter(e => !onBackdrop(e) && !this.#el.contains(e.target as Node)),
        takeUntil(this.#dragDrop.pointerMove.pipe(take(1))),
        repeat({ delay: () => this.#dragDrop.pointerUp.pipe(delay(0)) })
      )
    )
  );

  #opt: XPopoverPositionOptions | null = null;
  #ref: OverlayRef | null = null;

  constructor() {
    this.#destroyRef.onDestroy(() => {
      this.#ref?.dispose();
      this.#openChanges.next(false);
      this.#openChanges.complete();
    });
  }

  get element(): HTMLElement | null {
    return this.#ref?.overlayElement || null;
  }

  open(component: Type<unknown>, options: XPopoverPositionOptions): void {
    if (!this.#ref) {
      this.#opt = { ...options };
      this.#ref = this.createOverlay(this.#opt);
    }

    if (this.#ref.hasAttached()) {
      return;
    }

    this.#ref.attach(new ComponentPortal(component, this.#vcr));
    this.#openChanges.next(true);
  }

  close(): void {
    if (!this.#ref?.hasAttached()) {
      return;
    }

    this.#ref?.detach();
    this.#openChanges.next(false);
  }

  updatePosition(options?: Partial<XPopoverPositionOptions>): void {
    const overlayRef = this.#ref;

    if (!overlayRef) {
      return;
    }

    if (this.#opt && options) {
      coerceStrategy(overlayRef).withPositions(
        toCdkPositions((this.#opt = { ...this.#opt, ...options }))
      );
    }

    overlayRef.updatePosition();
  }

  updateSize(size: OverlaySizeConfig): void {
    this.#ref?.updateSize(size);
  }

  private createOverlay(opt: XPopoverPositionOptions): OverlayRef {
    return this.#cdk.create({
      hasBackdrop: false,
      scrollStrategy: this.#cdk.scrollStrategies.reposition(),
      positionStrategy: this.#cdk
        .position()
        .flexibleConnectedTo(this.#el)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withViewportMargin(opt.offset)
        .withLockedPosition(opt.fixed)
        .withPositions(toCdkPositions(opt)),
    });
  }
}

function onBackdrop(e: MouseEvent): boolean {
  return isElement(e.target) && e.target.classList.contains('cdk-overlay-backdrop');
}

function coerceStrategy(overlayRef: OverlayRef): FlexibleConnectedPositionStrategy {
  return overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
}

function fromCdkPosition(pair: ConnectionPositionPair): XPopoverPosition {
  const { originX, originY, overlayX, overlayY } = pair;

  if (originY === 'top' && overlayY === 'bottom') {
    return 'top';
  }

  if (originY === 'bottom' && overlayY === 'top') {
    return 'bottom';
  }

  if (originX === 'start' && overlayX === 'end') {
    return 'start';
  }

  if (originX === 'end' && overlayX === 'start') {
    return 'end';
  }

  if (originY === 'center') {
    if (originX === 'start' && overlayX === 'end') {
      return 'start';
    }
    if (originX === 'end' && overlayX === 'start') {
      return 'end';
    }
  }

  if (originX === 'center') {
    if (originY === 'top' && overlayY === 'bottom') {
      return 'top';
    }
    if (originY === 'bottom' && overlayY === 'top') {
      return 'bottom';
    }
  }

  if (originY !== overlayY) {
    return originY === 'top' ? 'top' : 'bottom';
  }

  return originX === 'start' ? 'start' : 'end';
}

function toCdkPositions({
  direction,
  position,
  align,
  offset,
  fixed,
}: XPopoverPositionOptions): ConnectedPosition[] {
  if (direction === 'horizontal' && (position === 'top' || position === 'bottom')) {
    console.warn(
      `Invalid combination: direction 'horizontal' cannot be used with position '${position}'. Expected 'start' or 'end'.`
    );
  }

  if (direction === 'vertical' && (position === 'start' || position === 'end')) {
    console.warn(
      `Invalid combination: direction 'vertical' cannot be used with position '${position}'. Expected 'top' or 'bottom'.`
    );
  }

  const positions: ConnectedPosition[] = [];

  positions.push(createCdkPosition(position, align, offset));

  if (fixed) {
    return positions;
  }

  positions.push(createCdkPosition(INVERTED[position], align, offset));

  if (direction === 'both') {
    if (position === 'top' || position === 'bottom') {
      positions.push(createCdkPosition('end', align, offset));
      positions.push(createCdkPosition('start', align, offset));
    } else {
      positions.push(createCdkPosition('bottom', align, offset));
      positions.push(createCdkPosition('top', align, offset));
    }
  }

  return positions;
}

function createCdkPosition(
  position: XPopoverPosition,
  align: XPopoverAlign,
  offset: number
): ConnectedPosition {
  switch (position) {
    case 'bottom':
      return {
        originX: align,
        originY: 'bottom',
        overlayX: align,
        overlayY: 'top',
        offsetY: offset,
      };
    case 'top':
      return {
        originX: align,
        originY: 'top',
        overlayX: align,
        overlayY: 'bottom',
        offsetY: offset * -1,
      };
    case 'end':
      return {
        originX: 'end',
        originY: VALIGN[align],
        overlayX: 'start',
        overlayY: VALIGN[align],
        offsetX: offset,
      };
    case 'start':
      return {
        originX: 'start',
        originY: VALIGN[align],
        overlayX: 'end',
        overlayY: VALIGN[align],
        offsetX: offset * -1,
      };
  }
}

const VALIGN = {
  center: 'center',
  start: 'top',
  end: 'bottom',
} as const;

const INVERTED = {
  top: 'bottom',
  bottom: 'top',
  end: 'start',
  start: 'end',
} as const;
