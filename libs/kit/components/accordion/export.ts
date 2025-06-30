import { XSlot } from '@mixin-ui/kit/directives';
import { XAccordionRoot } from './root';
import { XAccordionItem } from './item';

export const XAccordion = [XSlot, XAccordionRoot, XAccordionItem] as const;
