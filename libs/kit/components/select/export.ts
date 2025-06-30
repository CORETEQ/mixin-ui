import { XPopoverContent } from '@mixin-ui/kit/directives';
import { XListbox } from '@mixin-ui/kit/components/listbox';
import { XSelectRoot } from './root';
import { XValue } from './value';

export const XSelect = [...XListbox, XPopoverContent, XSelectRoot, XValue] as const;
