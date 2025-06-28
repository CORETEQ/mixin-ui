import { ChangeDetectionStrategy, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { provideControlAccessor, XControlAccessor, XInput } from '@mixin-ui/kit/directives';
import { EMPTY } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-mask',
  templateUrl: './mask.html',
  providers: [provideControlAccessor(forwardRef(() => XMask))],
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
export class XMask implements XControlAccessor<string> {
  valueChanges = EMPTY;

  setValue(value: string): void {}

  onControlInit(el: HTMLInputElement): void {}

  onControlDestroy(): void {}
}
