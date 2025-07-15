import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-multiple-example',
  templateUrl: './multiple.html',
  imports: [XAccordion, XAccordionItem, XSlot],
})
export class AccordionMultipleExample {}
