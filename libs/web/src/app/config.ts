import {
  ApplicationConfig,
  inject,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMarkdown } from 'ngx-markdown';
import { ROUTES } from './routes';
import { DocsTitleStrategy } from './docs/services';
import { provideIconSourceMapper } from '@mixin-ui/kit';

const OFFSET_TOP = 74;

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      ROUTES,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    {
      provide: TitleStrategy,
      useClass: DocsTitleStrategy,
    },
    provideEnvironmentInitializer(() => {
      inject(ViewportScroller).setOffset([0, OFFSET_TOP]);
    }),
    provideMarkdown(),
  ],
};
