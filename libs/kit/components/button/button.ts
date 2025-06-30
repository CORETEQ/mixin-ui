import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, fromEvent, switchMap } from 'rxjs';
import { stopPropagation } from '@mixin-ui/cdk';
import { XSpinner } from '@mixin-ui/kit/components/spinner';
import { X_BUTTON_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button[x-btn], button[x-icon], a[x-btn], a[x-icon]',
  exportAs: 'x-btn',
  styleUrl: './button.scss',
  templateUrl: './button.html',
  imports: [XSpinner],
  host: {
    '[class]': '`x-btn x-variant-${variant()} x-size-${size()} x-radius-${radius()}`',
    '[class.x-icon-only]': 'iconOnly',
    '[class.x-loading]': 'loading()',
    '[class.x-contrast]': 'contrast()',
    '[class.x-block]': 'block()',
    '[class.x-vertical]': 'vertical()',
    '[attr.data-main-color]': 'color()',
    '[attr.type]': 'attrType()',
  },
})
export class XButton {
  readonly #opt = inject(X_BUTTON_OPTIONS);
  readonly #el = inject(ElementRef).nativeElement;

  readonly iconOnly = this.#el.matches('[x-icon]');
  readonly type = input(this.#opt.type);
  readonly variant = input(this.#opt.variant);
  readonly color = input(this.#opt.color);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly loadingText = input(this.#opt.loadingText);
  readonly contrast = input(this.#opt.contrast, { transform: booleanAttribute });
  readonly block = input(this.#opt.block, { transform: booleanAttribute });
  readonly vertical = input(this.#opt.vertical, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly attrType = computed(() => (this.#el.tagName === 'A' ? null : this.type()));
  readonly withLoadingText = computed(() => this.loadingText() && !this.iconOnly);

  constructor() {
    toObservable(this.loading)
      .pipe(
        switchMap(loading =>
          loading ? fromEvent<Event>(this.#el, 'click', { capture: true }) : EMPTY
        ),
        stopPropagation(),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
