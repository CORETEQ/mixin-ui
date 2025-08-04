import { Component } from '@angular/core';
import { XButton } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-variants-example',
  imports: [XButton],
  template: `
    <div class="flex items-center flex-wrap gap-4">
      <button x-btn variant="solid">Solid</button>
      <button x-btn variant="outline">Outline</button>
      <button x-btn variant="surface">Surface</button>
      <button x-btn variant="subtle">Subtle</button>
      <button x-btn variant="ghost">Ghost</button>
      <button x-btn variant="plain">Plain</button>
    </div>
  `
})
export class VariantsExample {}
