import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkListbox } from '@angular/cdk/listbox';
import { XTypedOutletPipe } from '@mixin-ui/cdk';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { XOption } from './option';
import { X_LISTBOX_ACCESSOR } from './providers';
import { X_LISTBOX_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-listbox',
  styleUrl: './listbox.scss',
  templateUrl: './listbox.html',
  imports: [XTypedOutletPipe, NgComponentOutlet, NgTemplateOutlet],
  hostDirectives: [CdkListbox],
  host: {
    '[class]': '`x-listbox x-size-${size()} x-radius-${radius()}`',
  },
})
export class XListbox {
  readonly #opt = inject(X_LISTBOX_OPTIONS);
  readonly #accessor = inject(X_LISTBOX_ACCESSOR);
  readonly #cdkListbox = inject(CdkListbox);
  readonly #popover = inject(XPopoverTarget, { optional: true });

  readonly options = contentChildren(XOption);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly emptyContent = input(this.#opt.emptyContent);
  readonly empty = computed(() => this.options().length === 0);

  constructor() {
    effect(() => {
      const value = this.#accessor.value();
      const multiple = this.#accessor.multiple();
      const comparator = this.#accessor.comparator();

      untracked(() => {
        this.#cdkListbox.value = value;
        this.#cdkListbox.multiple = multiple;
        this.#cdkListbox.compareWith = comparator;
        this.#cdkListbox.useActiveDescendant = true;
      });
    });

    this.#cdkListbox.valueChange.pipe(takeUntilDestroyed()).subscribe(({ value }) => {
      this.#accessor.handleOptions(value);

      if (!this.#cdkListbox.multiple) {
        this.#popover?.toggle(false);
        this.#popover?.focusOrigin();
      }
    });
  }
}
