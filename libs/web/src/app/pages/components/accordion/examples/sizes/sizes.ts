import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-sizes-example',
  imports: [XAccordion, XAccordionItem, XSlot],
  template: `
    <div class="flex flex-col gap-4">
      <x-accordion size="sm">
        <x-accordion-item>
          Small
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>

      <x-accordion size="md">
        <x-accordion-item>
          Medium
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>

      <x-accordion size="lg">
        <x-accordion-item>
          Large
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>
    </div>
  `
})
export class AccordionSizesExample {}
