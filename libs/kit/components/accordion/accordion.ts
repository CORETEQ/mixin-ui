import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { generateId } from '@mixin-ui/cdk';
import { X_ACCORDION_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-accordion',
  styleUrl: './accordion.scss',
  templateUrl: './accordion.html',
  host: {
    '[class]': '`x-accordion x-size-${size()} x-radius-${radius()}`',
  },
})
export class XAccordion {
  readonly #opt = inject(X_ACCORDION_OPTIONS);

  readonly id = input(generateId());
  readonly multiple = input(this.#opt.multiple, { transform: booleanAttribute });
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
}
