import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { X_SLOT, XSlotsPipe } from '@mixin-ui/kit/directives';
import { X_FIELD_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-field',
  styleUrl: './field.scss',
  templateUrl: './field.html',
  imports: [XSlotsPipe, NgTemplateOutlet],
  host: { '[class]': '`x-field`' },
})
export class XField {
  readonly #opt = inject(X_FIELD_OPTIONS);

  readonly slots = contentChildren(X_SLOT);
  readonly withMark = input(this.#opt.withMark, { transform: booleanAttribute });
}
