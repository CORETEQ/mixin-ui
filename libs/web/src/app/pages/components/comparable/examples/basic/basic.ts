import { Component } from '@angular/core';
import { XComparable } from '@mixin-ui/kit';

@Component({
  selector: 'app-comparable-basic-example',
  imports: [XComparable],
  template: `
    <x-comparable>
      <img x-slot="start" src="img/comparable-js.png" alt="js" />
      <img x-slot="end" src="img/comparable-ts.png" alt="ts" />
    </x-comparable>
  `
})
export class ComparableBasicExample {}
