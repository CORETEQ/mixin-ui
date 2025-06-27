import { XListbox } from '@mixin-ui/kit/components/listbox';
import { XSelectRoot } from './select';
import { XValue } from './value';

export const XSelect = [...XListbox, XSelectRoot, XValue] as const;
