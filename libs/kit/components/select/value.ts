import { Directive, forwardRef } from '@angular/core';
import { provideNamedSlot, XSlot } from '@mixin-ui/kit/directives';

@Directive({
  selector: 'ng-template[x-value]:not([x-slot])',
  providers: [
    provideNamedSlot(
      'value',
      forwardRef(() => XValue)
    ),
  ],
})
export class XValue extends XSlot {}
