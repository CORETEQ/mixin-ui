import { InjectionToken, ValueProvider } from '@angular/core';

export const X_ICON_PATH_MAPPER = new InjectionToken<(src: string) => string>('ICON_PATH_MAPPER', {
  factory: () => (src: string) => src.includes('.') ? src : `icons/${src}.svg`,
});

export function provideIconPathMapper(useValue: (src: string) => string): ValueProvider {
  return {
    provide: X_ICON_PATH_MAPPER,
    useValue,
  };
}
