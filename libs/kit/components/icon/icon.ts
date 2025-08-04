import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { X_ICON_SOURCE_MAPPER } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-icon',
  styleUrl: './icon.scss',
  template: '',
  host: {
    class: 'x-icon',
    '[style.--x-icon-color]': 'color()',
    '[style.--x-icon-size.px]': 'size()',
  },
})
export class XIcon {
  readonly #map = inject(X_ICON_SOURCE_MAPPER);
  readonly #el = inject(ElementRef).nativeElement;
  readonly #r2 = inject(Renderer2);

  readonly src = input<string | null>();
  readonly raw = input(false, { transform: booleanAttribute });
  readonly color = input<string>();
  readonly size = input(null, { transform: numberAttribute });

  constructor() {
    effect(() => {
      const src = this.src();
      const prop = this.raw() ? 'background' : 'mask';

      if (src) {
        this.#r2.setStyle(this.#el, prop, `url(${this.#map(src)}) no-repeat center / contain`);
      } else {
        this.#r2.removeStyle(this.#el, prop);
      }
    });
  }
}
