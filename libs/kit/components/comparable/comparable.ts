import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, switchMap, takeUntil, tap } from 'rxjs';
import { clamp, fromAfterNextRender, preventDefault } from '@mixin-ui/cdk';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-comparable',
  styleUrl: './comparable.scss',
  templateUrl: './comparable.html',
  host: {
    class: 'x-comparable',
    '[style.--x-offset]': 'formattedOffset()',
  },
})
export class XComparable {
  readonly #document = inject(DOCUMENT);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly handle = viewChild.required<ElementRef<HTMLElement>>('handle');
  readonly offset = model(50);
  readonly initBy = input<'area' | 'handle'>('area');
  readonly formattedOffset = computed(() => `${clamp(this.offset(), 0, 100).toFixed(1)}%`);

  readonly #initBy$ = toObservable(this.initBy);

  readonly #handle$ = fromAfterNextRender().pipe(
    switchMap(() =>
      this.#initBy$.pipe(
        map(initBy => (initBy === 'handle' ? this.handle().nativeElement : this.#el))
      )
    )
  );

  #left = 0;
  #width = 0;

  constructor() {
    this.#handle$
      .pipe(
        switchMap(handle =>
          fromEvent<PointerEvent>(handle, 'pointerdown').pipe(
            // Left mouse, touch contact, pen contact only
            filter(e => !e.button),
            preventDefault(),
            tap(e => this.initOffset(e.x))
          )
        )
      )
      .pipe(
        switchMap(() =>
          fromEvent<PointerEvent>(this.#document, 'pointermove').pipe(
            tap(e => this.updateOffset(e.x)),
            takeUntil(fromEvent(this.#document, 'pointerup'))
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private initOffset(x: number): void {
    const { width, left } = this.#el.getBoundingClientRect();
    this.#width = width;
    this.#left = left;
    this.updateOffset(x);
  }

  private updateOffset(x: number): void {
    const clickX = x - this.#left;
    this.offset.set((clickX / this.#width) * 100);
  }
}
