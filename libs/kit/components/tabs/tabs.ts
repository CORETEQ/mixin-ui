import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  inject,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { fromAfterNextRender, fromMutationObserver, fromResizeObserver } from '@mixin-ui/cdk';
import {
  animationFrameScheduler,
  combineLatest,
  debounceTime,
  map,
  merge,
  observeOn,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { XTab } from './tab';

@Component({
  selector: 'x-tabs',
  host: {
    '[class]': '`x-tabs`',
  },
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XTabs {
  readonly activeIndex = model(0);

  protected readonly tabs = contentChildren(XTab);

  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  private readonly children$ = fromAfterNextRender().pipe(
    switchMap(() =>
      merge(
        fromMutationObserver(this.el, { childList: true, subtree: true, characterData: true }),
        fromResizeObserver(this.el)
      )
    ),
    debounceTime(0),
    map(() => this.el.querySelectorAll<HTMLElement>('.x-tab'))
  );

  constructor() {
    combineLatest([toObservable(this.activeIndex), this.children$])
      .pipe(
        map(([activeIndex, children]) => children[activeIndex]),
        observeOn(animationFrameScheduler),
        takeUntilDestroyed()
      )
      .subscribe(el => {
        this.el.style.setProperty('--x-offset', `${el?.offsetLeft || 0}px`);
        this.el.style.setProperty('--x-size', `${el?.clientWidth || 0}px`);
      });
  }

  updateIndex(index: number): void {
    this.activeIndex.set(index);
  }
}
