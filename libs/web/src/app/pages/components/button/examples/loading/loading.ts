import { Component } from '@angular/core';
import { XButton } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-loading-example',
  imports: [XButton],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <button x-icon loading size="xs" variant="ghost">Loading</button>
        <button x-btn loading size="xs" variant="ghost">Loading</button>
        <button x-btn loading loadingText="Loading..." size="xs" variant="ghost">Loading</button>
      </div>

      <div class="flex items-center gap-4">
        <button x-icon loading size="sm" variant="subtle">Loading</button>
        <button x-btn loading size="sm" variant="subtle">Loading</button>
        <button x-btn loading loadingText="Loading..." size="sm" variant="subtle">Loading</button>
      </div>

      <div class="flex items-center gap-4">
        <button x-icon loading size="md" variant="outline">Loading</button>
        <button x-btn loading size="md" variant="outline">Loading</button>
        <button x-btn loading loadingText="Loading..." size="md" variant="outline">Loading</button>
      </div>

      <div class="flex items-center gap-4">
        <button x-icon loading size="lg" variant="surface">Loading</button>
        <button x-btn loading size="lg" variant="surface">Loading</button>
        <button x-btn loading loadingText="Loading..." size="lg" variant="surface">Loading</button>
      </div>

      <div class="flex items-center gap-4">
        <button x-icon loading size="xl">Loading</button>
        <button x-btn loading size="xl">Loading</button>
        <button x-btn loading loadingText="Loading..." size="xl">Loading</button>
      </div>
    </div>
  `
})
export class LoadingExample {}
