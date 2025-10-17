import { Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, merge } from 'rxjs';
import { fromMutationObserver, fromResizeObserver } from '@mixin-ui/cdk/interop/rxjs';

type ScrollEdge = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[x-scroll-threshold]',
  exportAs: 'x-scroll-threshold',
})
export class XScrollThreshold {
  readonly #doc = inject(DOCUMENT);
  readonly #el = inject(ElementRef).nativeElement;

  readonly edge = input<ScrollEdge>('bottom', { alias: 'x-scroll-threshold-edge' });
  readonly offset = input(0, { alias: 'x-scroll-threshold-offset', transform: numberAttribute });

  readonly reached = outputFromObservable(
    merge(
      fromEvent(this.#el, 'scroll', { passive: true }),
      merge(
        fromResizeObserver(this.#el),
        fromMutationObserver(this.#el, { childList: true, subtree: true })
      ).pipe(filter(() => this.#doc.body.contains(this.#el)))
    ).pipe(
      debounceTime(50),
      map(() => this.isScrollAtThreshold()),
      distinctUntilChanged()
    ),
    { alias: 'x-scroll-threshold' }
  );

  private isScrollAtThreshold(): boolean {
    const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } =
      this.#el;

    if (clientHeight === 0 || clientWidth === 0) {
      return false;
    }

    const edge = this.edge();
    const offset = this.offset();

    switch (edge) {
      case 'top':
        return scrollTop <= offset;

      case 'bottom':
        return scrollTop + clientHeight >= scrollHeight - offset;

      case 'left':
        return scrollLeft <= offset;

      case 'right':
        return scrollLeft + clientWidth >= scrollWidth - offset;

      default:
        return false;
    }
  }
}
