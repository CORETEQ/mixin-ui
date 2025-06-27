import {
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectedOverlayPositionChange,
  ConnectedPosition,
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

export type XOverlayDirection = 'horizontal' | 'vertical' | 'both';
export type XOverlayPosition = 'top' | 'end' | 'bottom' | 'start';
export type XOverlayAlign = 'start' | 'center' | 'end';

export interface XConnectedOverlayPosition {
  readonly direction: XOverlayDirection;
  readonly position: XOverlayPosition;
  readonly align: XOverlayAlign;
  readonly offset: number;
  readonly fixedPosition: boolean;
}

export interface XConnectedOverlayOptions extends XConnectedOverlayPosition {
  readonly hasBackdrop: boolean;
}

const defaultOptions: XConnectedOverlayOptions = {
  direction: 'vertical',
  position: 'bottom',
  align: 'start',
  offset: 4,
  fixedPosition: false,
  hasBackdrop: false,
};

export function overlay(injector?: Injector): XConnectedOverlay {
  return runInInjectionContext(injector || inject(Injector), () => new XConnectedOverlay());
}

export class XConnectedOverlay {
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #overlay = inject(Overlay);
  readonly #vcr = inject(ViewContainerRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #dragDrop = inject(DragDropRegistry);

  readonly #open$ = new BehaviorSubject(false);
  readonly #ref$ = this.#open$.pipe(switchMap(open => (open && this.#ref ? of(this.#ref) : EMPTY)));

  readonly openChanges = this.#open$.asObservable();
  readonly positionChanges = this.#ref$.pipe(
    switchMap(ref => coerceStrategy(ref).positionChanges.pipe(map(coercePosition)))
  );

  readonly keydownEvents = this.#ref$.pipe(switchMap(ref => ref.keydownEvents()));
  readonly backdropEvents = this.#ref$.pipe(switchMap(ref => ref.backdropClick()));
  readonly outsidePointerEvents = this.#ref$.pipe(
    switchMap(ref =>
      ref.outsidePointerEvents().pipe(
        filter(e => !hasBackdrop(ref) && !onBackdrop(e) && !this.#el.contains(e.target as Node)),
        takeUntil(this.#dragDrop.pointerMove.pipe(take(1))),
        repeat({ delay: () => this.#dragDrop.pointerUp.pipe(delay(0)) })
      )
    )
  );

  #opt: XConnectedOverlayOptions = defaultOptions;
  #ref: OverlayRef | null = null;

  constructor() {
    this.#destroyRef.onDestroy(() => {
      this.#ref?.dispose();
      this.#open$.next(false);
      this.#open$.complete();
    });
  }

  get element(): HTMLElement | null {
    return this.#ref?.overlayElement || null;
  }

  open(component: Type<unknown>, options: Partial<XConnectedOverlayOptions>): void {
    if (!this.#ref) {
      this.#opt = { ...defaultOptions, ...options };
      this.#ref = this.createOverlay(this.#opt);
    }

    if (this.#ref.hasAttached()) {
      return;
    }

    this.#ref.attach(new ComponentPortal(component, this.#vcr));
    this.#open$.next(true);
  }

  close(): void {
    if (!this.#ref?.hasAttached()) {
      return;
    }

    this.#ref?.detach();
    this.#open$.next(false);
  }

  updatePosition(options?: Partial<XConnectedOverlayPosition>): void {
    const overlayRef = this.#ref;

    if (!overlayRef) {
      return;
    }

    if (options) {
      coerceStrategy(overlayRef).withPositions(
        mapPositions((this.#opt = { ...this.#opt, ...options }))
      );
    }

    overlayRef.updatePosition();
  }

  updateSize(size: OverlaySizeConfig): void {
    this.#ref?.updateSize(size);
  }

  private createOverlay(opt: XConnectedOverlayOptions): OverlayRef {
    return this.#overlay.create({
      hasBackdrop: opt.hasBackdrop,
      scrollStrategy: this.#overlay.scrollStrategies.reposition(),
      positionStrategy: this.#overlay
        .position()
        .flexibleConnectedTo(this.#el)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withViewportMargin(opt.offset)
        .withLockedPosition(opt.fixedPosition)
        .withPositions(mapPositions(opt)),
    });
  }
}

function coerceStrategy(overlayRef: OverlayRef) {
  return overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
}

function coercePosition({ connectionPair }: ConnectedOverlayPositionChange): XOverlayPosition {
  const { originX, originY, overlayX, overlayY } = connectionPair;

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

function hasBackdrop(overlayRef: OverlayRef) {
  return overlayRef.getConfig().hasBackdrop;
}

function onBackdrop(e: MouseEvent) {
  return isElement(e.target) && e.target.classList.contains('cdk-popover-backdrop');
}

function mapPositions({
  direction,
  position,
  align,
  offset,
  fixedPosition,
}: XConnectedOverlayPosition): ConnectedPosition[] {
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

  positions.push(createPosition(position, align, offset));

  if (fixedPosition) {
    return positions;
  }

  positions.push(createPosition(INVERTED[position], align, offset));

  if (direction === 'both') {
    if (position === 'top' || position === 'bottom') {
      positions.push(createPosition('end', align, offset));
      positions.push(createPosition('start', align, offset));
    } else {
      positions.push(createPosition('bottom', align, offset));
      positions.push(createPosition('top', align, offset));
    }
  }

  return positions;
}

function createPosition(
  position: XOverlayPosition,
  align: XOverlayAlign,
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
