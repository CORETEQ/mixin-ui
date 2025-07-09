import { XSlot } from '@mixin-ui/kit/directives';
import { XAccordionRoot } from './accordion';
import { XAccordionItem } from './item';

export const XAccordion = [XSlot, XAccordionRoot, XAccordionItem] as const;
