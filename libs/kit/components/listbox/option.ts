import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
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
      inputs: [
        'id',
        'cdkOption: value',
        'cdkOptionDisabled: disabled',
        'cdkOptionTypeaheadLabel: typeaheadLabel',
      ],
    },
  ],
  host: {
    class: 'x-option',
    '(click)': 'handlePopoverClose()',
    '(keydown.enter)': 'handlePopoverClose()',
    '(keydown.space)': 'handlePopoverClose()',
    '(mouseenter)': 'setActiveOption()',
  },
})
export class XOption {
  readonly #cdkListbox = inject(CdkListbox);
  readonly #cdkOption = inject(CdkOption, { self: true });
  readonly #popover = inject(XPopoverTarget, { skipSelf: true, optional: true });

  readonly hasSelfPopover = !!inject(XPopoverTarget, { self: true, optional: true });

  protected handlePopoverClose(): void {
    if (!this.#cdkListbox.multiple && this.#cdkOption.isSelected()) {
      this.#popover?.toggle(false);
      this.#popover?.focusOrigin();
    }
  }

  protected setActiveOption(): void {
    this.#cdkListbox._setActiveOption(this.#cdkOption);
  }
}
