import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { generateId } from '@mixin-ui/cdk';
import { X_SLOT, XSlot, XSlotsPipe } from '@mixin-ui/kit/directives';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { XCollapsible } from '@mixin-ui/kit/components/collapsible';
import { XAccordionRoot } from './root';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-accordion-item',
  styleUrl: './item.scss',
  templateUrl: './item.html',
  imports: [NgTemplateOutlet, XCollapsible, XSlot, XSlotsPipe, XIcon],
  host: { class: 'x-accordion-item' },
})
export class XAccordionItem {
  readonly #root = inject(XAccordionRoot);

  readonly slots = contentChildren(X_SLOT);
  readonly open = model(false);
  readonly id = input(generateId());
  readonly groupName = computed(() => (this.#root.multiple() ? this.id() : this.#root.id()));
}
