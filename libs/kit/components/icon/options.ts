import { InjectionToken, ValueProvider } from '@angular/core';

export const X_ICON_SOURCE_MAPPER = new InjectionToken<(src: string) => string>('ICON_MAPPER', {
  factory: () => (src: string) => src.includes('.') ? src : `icons/${src}.svg`,
});

export function provideIconSourceMapper(useValue: (src: string) => string): ValueProvider {
  return {
    provide: X_ICON_SOURCE_MAPPER,
    useValue,
  };
}
