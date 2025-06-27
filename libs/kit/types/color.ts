import { XUnion } from './utils';

export type XColor = XUnion<
  'orange' | 'pink' | 'gray' | 'green' | 'blue' | 'purple' | 'indigo' | 'rose' | 'red' | 'yellow'
>;
