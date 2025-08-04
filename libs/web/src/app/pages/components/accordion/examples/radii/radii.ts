import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-radii-example',
  imports: [XAccordion, XAccordionItem, XSlot],
  template: `
    <div class="flex flex-col gap-4">
      <x-accordion radius="none">
        <x-accordion-item>
          None
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>

      <x-accordion radius="sm">
        <x-accordion-item>
          Small
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>

      <x-accordion radius="md">
        <x-accordion-item>
          Medium
          <ng-template x-slot="content">
            Content
          </ng-template>
        </x-accordion-item>
      </x-accordion>

      <x-accordion radius="lg">
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
export class AccordionRadiiExample {}
