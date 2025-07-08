import { XControl, XPopoverContent } from '@mixin-ui/kit/directives';
import { XCalendar } from '@mixin-ui/kit/components/calendar';
import { XDateRoot } from './root';

export const XInputDate = [XControl, XPopoverContent, XCalendar, XDateRoot] as const;
