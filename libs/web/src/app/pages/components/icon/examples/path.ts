import { provideIconPathMapper } from '@mixin-ui/kit';

bootstrapApplication(AppComponent, {
  providers: [
    // ...
    provideIconPathMapper(src =>
      src.startsWith('https://') ? src : `/my-assets/icons/${src}.svg`,
    )
  ]
})
