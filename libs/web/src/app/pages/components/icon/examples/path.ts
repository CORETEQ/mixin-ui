import { provideIconSourceMapper } from '@mixin-ui/kit';

bootstrapApplication(AppComponent, {
  providers: [
    // ...
    provideIconSourceMapper(src =>
      src.startsWith('https://') ? src : `/my-assets/icons/${src}.svg`,
    )
  ]
})
