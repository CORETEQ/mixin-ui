type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export type XUnion<T, U extends Primitive = string> = T | (U & Record<never, never>);
