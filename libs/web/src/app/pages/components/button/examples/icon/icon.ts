import { Component } from '@angular/core';
import { provideButtonOptions, XButton, XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-icon-example',
  imports: [XButton, XIcon],
  providers: [provideButtonOptions({ color: 'neutral' })],
  template: `
    <div class="flex items-center flex-wrap gap-4">
      <button x-btn>
        <x-icon src="check" />
        Icon start
      </button>

      <button x-icon>
        <x-icon src="check" />
      </button>

      <button x-btn>
        Icon end
        <x-icon src="check" />
      </button>
    </div>
  `
})
export class IconExample {}
