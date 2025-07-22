import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  OnDestroy,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkListbox } from '@angular/cdk/listbox';
import { EMPTY_FN, XTypedOutletPipe } from '@mixin-ui/cdk';
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
export class XListbox implements OnDestroy {
  readonly #opt = inject(X_LISTBOX_OPTIONS);
  readonly #accessor = inject(X_LISTBOX_ACCESSOR, { optional: true });
  readonly #cdkListbox = inject(CdkListbox);
  readonly #popover = inject(XPopoverTarget, { optional: true });

  readonly options = contentChildren(XOption);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly emptyContent = input(this.#opt.emptyContent);
  readonly useActiveDescendant = input(false);
  readonly empty = computed(() => this.options().length === 0);

  constructor() {
    // @TODO: remove after refactoring of XListbox to new cdk approach
    (this.#cdkListbox as Record<string, any>)._verifyOptionValues = EMPTY_FN;

    effect(() => {
      const value = this.#accessor?.value();
      const multiple = this.#accessor?.multiple() || false;
      const comparator = this.#accessor?.comparator();
      const useActiveDescendant = this.useActiveDescendant();

      untracked(() => {
        this.#cdkListbox.value = value;
        this.#cdkListbox.multiple = multiple;
        this.#cdkListbox.compareWith = comparator;
        this.#cdkListbox.useActiveDescendant = useActiveDescendant;
      });
    });

    afterRenderEffect(() => {
      const options = this.options();

      untracked(() => {
        this.#accessor?.handleListboxOptions?.(options.map(option => option.value()));
      });
    });

    this.#cdkListbox.valueChange.pipe(takeUntilDestroyed()).subscribe(({ value }) => {
      this.#accessor?.handleListboxValue(value);

      if (!this.#cdkListbox.multiple) {
        this.#popover?.toggle(false);
        this.#popover?.focus();
      }
    });

    if (this.#accessor) {
      this.#accessor.keyboardEvents.pipe(takeUntilDestroyed()).subscribe(event => {
        (this.#cdkListbox as any)._handleKeydown(event);
      });
    }
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.#accessor?.handleListboxOptions?.(null);
    });
  }
}
