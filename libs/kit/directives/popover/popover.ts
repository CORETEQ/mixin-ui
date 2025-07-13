import {
  computed,
  contentChild,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  PLATFORM_ID,
  TemplateRef,
  untracked,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { OverlaySizeConfig } from '@angular/cdk/overlay';
import { distinctUntilChanged, map, merge, of, switchMap } from 'rxjs';
import { fromResizeObserver, XOutlet, XPopoverPositionOptions } from '@mixin-ui/cdk';
import { XPopoverContainer } from './container';
import { X_POPOVER_OPTIONS } from './options';
import {
  X_POPOVER,
  X_POPOVER_CLOSE,
  X_POPOVER_POSITION_OPTIONS,
  X_POPOVER_PROVIDERS,
} from './providers';

@Directive({
  selector: '[x-popover]:not(ng-template)',
  exportAs: 'x-popover',
  providers: X_POPOVER_PROVIDERS,
  host: { '[class.x-overlay-opened]': 'open()' },
})
export class XPopover {
  readonly #opt = inject(X_POPOVER_OPTIONS);
  readonly #overlay = inject(X_POPOVER);
  readonly #position = inject(X_POPOVER_POSITION_OPTIONS);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #parent = inject(XPopover, { skipSelf: true, optional: true });
  readonly #close$ = inject(X_POPOVER_CLOSE);

  readonly childContent = contentChild(XPopoverContent, { read: TemplateRef });
  readonly inputContent = input<XOutlet>(null, { alias: 'x-popover' });
  readonly manual = model(false, { alias: 'x-popover-open' });
  readonly direction = input(this.#position.direction, { alias: 'x-popover-direction' });
  readonly position = input(this.#position.position, { alias: 'x-popover-position' });
  readonly align = input(this.#position.align, { alias: 'x-popover-align' });
  readonly offset = input(this.#position.offset, { alias: 'x-popover-offset' });
  readonly fixed = input(this.#position.fixed, { alias: 'x-popover-fixed' });
  readonly stretch = input(this.#opt.stretch, { alias: 'x-popover-stretch' });
  readonly minWidth = input(this.#opt.minWidth, { alias: 'x-popover-min-width' });
  readonly maxWidth = input(this.#opt.minWidth, { alias: 'x-popover-max-width' });
  readonly minHeight = input(this.#opt.minHeight, { alias: 'x-popover-min-height' });
  readonly maxHeight = input(this.#opt.maxHeight, { alias: 'x-popover-max-height' });
  readonly content = computed(() => this.inputContent() || this.childContent());
  readonly open = toSignal(this.#overlay.openChanges, { requireSync: true });

  readonly #manual$ = toObservable(this.manual);

  readonly rules = toSignal(
    toObservable(this.stretch).pipe(
      switchMap(width =>
        width === 'fit'
          ? fromResizeObserver(this.#el).pipe(
              map(() => ({
                width: this.#el.offsetWidth,
                height: this.#el.offsetHeight,
              }))
            )
          : of(null)
      )
    ),
    { initialValue: null }
  );

  constructor() {
    if (isPlatformServer(inject(PLATFORM_ID))) {
      return;
    }

    effect(() => {
      const open = this.open();
      const rules = this.rules();
      const minWidth = this.minWidth();
      const maxWidth = this.maxWidth();
      const minHeight = this.minHeight();
      const maxHeight = this.maxHeight();

      untracked(() => {
        if (open) {
          this.updateSize({ width: rules?.width, minWidth, maxWidth, minHeight, maxHeight });
          this.updatePosition();
        }
      });
    });

    effect(() => {
      const content = this.content();
      const direction = this.direction();
      const position = this.position();
      const align = this.align();
      const offset = this.offset();
      const fixed = this.fixed();

      untracked(() => {
        if (content) {
          this.updatePosition({ direction, position, align, offset, fixed });
        } else {
          this.toggle(false);
        }
      });
    });

    merge(this.#manual$, this.#close$)
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(open => this.toggle(open));
  }

  get overlayElement(): HTMLElement | null {
    return this.#overlay.element;
  }

  toggle(open: boolean): void {
    if (open && this.content()) {
      this.#overlay.open(XPopoverContainer, {
        direction: this.direction(),
        position: this.position(),
        align: this.align(),
        offset: this.offset(),
        fixed: this.fixed(),
      });
    } else if (!open) {
      this.#overlay.close();
    }
    this.manual.set(open);
  }

  updateSize(value: OverlaySizeConfig): void {
    this.#overlay.updateSize(value);
  }

  updatePosition(position?: Partial<XPopoverPositionOptions>): void {
    this.#overlay.updatePosition(position);
  }

  focusOrigin(): void {
    this.#el.focus();
  }
}

@Directive({ selector: 'ng-template[x-popover]' })
export class XPopoverContent {}
