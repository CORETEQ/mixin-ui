import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { XIcon } from '@mixin-ui/kit/components/icon';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-option',
  styleUrl: './option.scss',
  templateUrl: './option.html',
  imports: [XIcon],
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['id', 'cdkOptionDisabled: disabled', 'cdkOptionTypeaheadLabel: typeaheadLabel'],
    },
  ],
  host: {
    class: 'x-option',
    '(click)': 'handlePopoverClose()',
    '(keydown.enter)': 'handlePopoverClose()',
    '(keydown.space)': 'handlePopoverClose()',
    '(pointerenter)': 'handlePointerEnter()',
  },
})
export class XOption<V> {
  readonly #cdkListbox = inject(CdkListbox);
  readonly #cdkOption = inject(CdkOption, { self: true });
  readonly #popover = inject(XPopoverTarget, { skipSelf: true, optional: true });

  readonly value = input.required<V>();

  constructor() {
    effect(() => {
      this.#cdkOption.value = this.value();
    });
  }

  handlePopoverClose(): void {
    if (!this.#cdkListbox.multiple && this.#cdkOption.isSelected()) {
      this.#popover?.toggle(false);
      this.#popover?.focusOrigin();
    }
  }

  handlePointerEnter(): void {
    this.#cdkListbox._setActiveOption(this.#cdkOption);
  }
}
