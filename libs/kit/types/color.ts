import { XUnion } from './utils';

export type XColor = XUnion<'main' | 'gray' | 'error' | 'warn' | 'success'>;
