import { XControl, XPopoverContent } from '@mixin-ui/kit/directives';
import { XCalendar } from '@mixin-ui/kit/components/calendar';
import { XDateRoot } from './date';

export const XInputDate = [XControl, XPopoverContent, XCalendar, XDateRoot] as const;
