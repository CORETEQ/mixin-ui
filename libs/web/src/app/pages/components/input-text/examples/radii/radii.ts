import { Component } from '@angular/core';
import { XInputText } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-text-radii-example',
  imports: [XInputText],
  template: `
    <div class="grid grid-cols-3 items-start gap-3">
      <x-input-text radius="sm">
        <input placeholder="Small">
      </x-input-text>
      <x-input-text radius="md">
        <input placeholder="Medium">
      </x-input-text>
      <x-input-text radius="lg">
        <input placeholder="Large">
      </x-input-text>
      <x-input-text radius="none">
        <input placeholder="None">
      </x-input-text>
      <x-input-text radius="full">
        <input placeholder="Full">
      </x-input-text>
    </div>
  `
})
export class InputTextRadiiExample {}
