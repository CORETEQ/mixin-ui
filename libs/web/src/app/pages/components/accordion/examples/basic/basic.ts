import { Component } from '@angular/core';
import { XAccordion, XAccordionItem, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-accordion-basic-example',
  templateUrl: './basic.html',
  imports: [XAccordion, XAccordionItem, XSlot],
})
export class AccordionBasicExample {}
