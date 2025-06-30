import { XControl, XPopoverContent } from '@mixin-ui/kit/directives';
import { XListbox } from '@mixin-ui/kit/components/listbox';
import { XComboboxRoot } from './root';

export const XCombobox = [...XListbox, XControl, XPopoverContent, XComboboxRoot] as const;
