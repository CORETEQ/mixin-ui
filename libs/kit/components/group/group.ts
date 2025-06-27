import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { X_GROUP_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-group',
  styleUrl: './group.scss',
  template: '<ng-content/>',
  host: {
    role: 'group',
    '[class]': '`x-group x-orientation-${orientation()}`',
    '[class.x-attached]': 'attached()',
  },
})
export class XGroup {
  readonly #opt = inject(X_GROUP_OPTIONS);

  readonly orientation = input(this.#opt.orientation);
  readonly attached = input(this.#opt.attached, { transform: booleanAttribute });
}
