import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({ name: 'map' })
export class XMapPipe implements PipeTransform {
  readonly transform = <Value, Result, Args extends unknown[]>(
    value: Value,
    fn: (...args: [Value, ...Args]) => Result,
    ...args: Args
  ): Result => fn(value, ...args);
}
