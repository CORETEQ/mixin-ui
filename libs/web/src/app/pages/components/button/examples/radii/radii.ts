import { Component } from '@angular/core';
import { XButton } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-radii-example',
  imports: [XButton],
  template: `
    <div class="flex items-center flex-wrap gap-4">
      <button x-btn radius="none">None</button>
      <button x-btn radius="sm">Small</button>
      <button x-btn radius="md">Medium</button>
      <button x-btn radius="lg">Large</button>
      <button x-btn radius="full">Full</button>
    </div>
  `,
})
export class RadiiExample {}
