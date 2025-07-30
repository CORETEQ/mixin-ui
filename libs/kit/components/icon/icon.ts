import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';
import { X_ICON_PATH_MAPPER } from './options';

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
  readonly #toPath = inject(X_ICON_PATH_MAPPER);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly src = input<string | null>();
  readonly raw = input(false, { transform: booleanAttribute });
  readonly color = input<string>();
  readonly size = input(null, { transform: numberAttribute });

  constructor() {
    effect(() => {
      const { style } = this.#el;
      const src = this.src();
      const prop = this.raw() ? 'background' : 'mask';

      if (src) {
        style.setProperty(prop, `url(${this.#toPath(src)}) no-repeat center / contain`);
      } else {
        style.removeProperty(prop);
      }
    });
  }
}
