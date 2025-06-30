export function isObject<T extends Record<string, any>>(x: unknown): x is NonNullable<T> {
  return typeof x === 'object' && !!x;
}
