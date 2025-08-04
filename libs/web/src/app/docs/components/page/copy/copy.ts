import { Directive, ElementRef, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Clipboard } from '@angular/cdk/clipboard';
import { exhaustMap, fromEvent, map, startWith, timer } from 'rxjs';

@Directive({
  selector: 'button[clipboard]',
  exportAs: 'clipboard',
  host: {
    type: 'button',
  },
})
export class DocsCopy {
  readonly #clipboard = inject(Clipboard);

  readonly text = input<string>('', { alias: 'clipboard' });

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
