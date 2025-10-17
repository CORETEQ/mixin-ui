import { Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, merge, startWith } from 'rxjs';
import { fromMutationObserver, fromResizeObserver } from '@mixin-ui/cdk/interop/rxjs';

@Directive({
  selector: '[x-scroll-threshold]',
  exportAs: 'x-scroll-threshold',
})
export class XScrollThreshold {
  readonly #doc = inject(DOCUMENT);
  readonly #el = inject(ElementRef).nativeElement;

  readonly direction = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
  readonly threshold = input(0, { transform: numberAttribute });

  readonly isReached = toSignal(
    merge(
      fromEvent(this.#el, 'scroll', { passive: true }),
      merge(
        fromResizeObserver(this.#el),
        fromMutationObserver(this.#el, { childList: true, subtree: true })
      ).pipe(filter(() => this.#doc.body.contains(this.#el)))
    ).pipe(
      debounceTime(50),
      map(() => this.isScrollAtThreshold()),
      distinctUntilChanged(),
      startWith(this.isScrollAtThreshold())
    ),
    { requireSync: true }
  );

  private isScrollAtThreshold(): boolean {
    const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } =
      this.#el;

    if (clientHeight === 0 || clientWidth === 0) {
      return false;
    }

    const direction = this.direction();
    const threshold = this.threshold();

    switch (direction) {
      case 'top':
        return scrollTop <= threshold;

      case 'bottom':
        return scrollTop + clientHeight >= scrollHeight - threshold;

      case 'left':
        return scrollLeft <= threshold;

      case 'right':
        return scrollLeft + clientWidth >= scrollWidth - threshold;

      default:
        return false;
    }
  }
}
