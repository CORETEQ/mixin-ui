import { XUnion } from './utils';

export type XColor = XUnion<'main' | 'neutral' | 'error' | 'warn' | 'success'>;
