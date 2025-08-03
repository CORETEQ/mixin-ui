import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Clipboard } from '@angular/cdk/clipboard';
import { exhaustMap, fromEvent, map, startWith, timer } from 'rxjs';
import { XIcon } from '@mixin-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [XIcon],
  selector: 'button[docsCopy]',
  template: `
    @if (copied()) {
    <x-icon src="check" />
    } @else {
    <x-icon src="copy" />
    }
  `,
  host: {
    type: 'button',
  },
})
export class DocsCopy {
  readonly #clipboard = inject(Clipboard);

  readonly text = input<string>('', { alias: 'docsCopy' });

  readonly copied = toSignal(
    fromEvent(inject(ElementRef).nativeElement, 'click').pipe(
      exhaustMap(() => {
        this.#clipboard.copy(this.text());
        return timer(2000).pipe(
          map(() => false),
          startWith(true)
        );
      })
    ),
    { initialValue: false }
  );
}
