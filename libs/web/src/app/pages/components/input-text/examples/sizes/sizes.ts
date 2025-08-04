import { Component } from '@angular/core';
import { XIcon, XInputText } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-text-sizes-example',
  imports: [XInputText, XIcon],
  template: `
    <div class="flex items-start gap-3">
      <x-input-text size="md">
    <span class="x-input-prefix">
      <x-icon src="search" />
    </span>
        <input placeholder="Medium">
      </x-input-text>

      <x-input-text size="lg">
    <span class="x-input-prefix">
      <x-icon src="search" />
    </span>
        <input placeholder="Large">
      </x-input-text>

      <x-input-text size="xl">
    <span class="x-input-prefix">
      <x-icon src="search" />
    </span>
        <input placeholder="Extra large">
      </x-input-text>
    </div>
  `
})
export class InputTextSizesExample {}
