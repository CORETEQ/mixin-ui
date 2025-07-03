import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { provideControlAccessor, XControlAccessor, XInput } from '@mixin-ui/kit/directives';
import { EMPTY } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-mask',
  templateUrl: './root.html',
  providers: [provideControlAccessor(forwardRef(() => XMaskRoot))],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    class: 'x-mask',
  },
})
export class XMaskRoot implements XControlAccessor<string> {
  valueChanges = EMPTY;

  handleControlValue(value: string): void {}

  handleControlInit(el: HTMLInputElement): void {}

  handleControlDestroy(): void {}
}
