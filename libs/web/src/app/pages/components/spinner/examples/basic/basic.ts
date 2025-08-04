import { Component } from '@angular/core';
import { XSpinner } from '@mixin-ui/kit';

@Component({
  selector: 'app-spinner-basic-example',
  imports: [XSpinner],
  template: `
    <div class="flex items-center gap-5">
      <x-spinner style="--x-spinner-size: 1.5rem; --x-spinner-color: var(--x-neutral-700)" />
    </div>
  `
})
export class SpinnerBasicExample {}
