import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-basic-example',
  imports: [XAccordion, XAccordionItem, XSlot],
  template: `
    <x-accordion size="lg">
      <x-accordion-item [open]="true">
        Angular
        <ng-template x-slot="content">
          Angular (also referred to as Angular 2+) is a TypeScript-based free and open-source single-page web
          application
          framework.
        </ng-template>
      </x-accordion-item>

      <x-accordion-item>
        Vue.js
        <ng-template x-slot="content">
          Vue.js (commonly referred to as Vue; pronounced "view") is an open-source model–view–viewmodel front end
          JavaScript framework for building user interfaces and single-page applications.
        </ng-template>
      </x-accordion-item>

      <x-accordion-item>
        React
        <ng-template x-slot="content">
          React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library.
        </ng-template>
      </x-accordion-item>
    </x-accordion>
  `,
})
export class AccordionBasicExample {}
