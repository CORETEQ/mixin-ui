import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-multiple-example',
  imports: [XAccordion, XAccordionItem, XSlot],
  template: `
    <x-accordion size="lg" multiple>
      <x-accordion-item [open]="true">
        Item 1
        <ng-template x-slot="content">
          Content
        </ng-template>
      </x-accordion-item>

      <x-accordion-item [open]="true">
        Item 2
        <ng-template x-slot="content">
          Content
        </ng-template>
      </x-accordion-item>

      <x-accordion-item>
        Item 3
        <ng-template x-slot="content">
          Content
        </ng-template>
      </x-accordion-item>
    </x-accordion>
  `
})
export class AccordionMultipleExample {}
