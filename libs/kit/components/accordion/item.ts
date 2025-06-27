import {
  booleanAttribute,
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
import { X_ACCORDION_OPTIONS } from './options';
import { XAccordionRoot } from './root';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-accordion-item',
  imports: [NgTemplateOutlet, XCollapsible, XSlotsPipe, XIcon, XSlot],
  templateUrl: './item.html',
  styleUrl: './item.scss',
  host: { class: 'x-accordion-item' },
})
export class XAccordionItem {
  readonly #opt = inject(X_ACCORDION_OPTIONS);
  readonly #root = inject(XAccordionRoot);

  readonly slots = contentChildren(X_SLOT);
  readonly open = model(false);
  readonly id = input(generateId());
  readonly withIcon = input(this.#opt.withIcon, { transform: booleanAttribute });
  readonly groupName = computed(() => (this.#root.multiple() ? this.id() : this.#root.id()));
}
