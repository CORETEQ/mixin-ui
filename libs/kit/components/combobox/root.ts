import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  linkedSignal,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  provideControlAccessor,
  XControlAccessor,
  XInput,
  XPopover,
} from '@mixin-ui/kit/directives';
import { provideListboxAccessor, XListboxAccessor } from '@mixin-ui/kit/components/listbox';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-combobox',
  styleUrl: './root.scss',
  templateUrl: './root.html',
  imports: [],
  providers: [
    provideControlAccessor(forwardRef(() => XComboboxRoot)),
    provideListboxAccessor(forwardRef(() => XComboboxRoot)),
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: {
    role: 'combobox',
    class: 'x-combobox',
    '(keydown.arrowDown)': '$event.preventDefault(); togglePopover(true)',
    '(click)': 'togglePopover(!open())',
  },
})
export class XComboboxRoot<T>
  implements XControlAccessor<T | readonly T[] | null>, XListboxAccessor<T>
{
  readonly #popover = inject(XPopover, { self: true });

  readonly open = this.#popover.open;
  readonly multiple = input(false);
  readonly value = linkedSignal(() => (this.multiple() ? [] : null));

  readonly valueChanges = new Subject<T | readonly T[] | null>();

  handleControlValue(value: T | readonly T[] | null): void {
    // this.value.set(value);
  }

  handleOptions(values: readonly T[]): void {
    this.valueChanges.next(this.multiple() ? values : values.at(0) ?? null);
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }
}
