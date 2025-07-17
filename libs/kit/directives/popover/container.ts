import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  INJECTOR,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { getFocusableElement, isPureEscape, typedOutlet } from '@mixin-ui/cdk';
import { XPopoverTarget } from './popover';
import { X_POPOVER } from './providers';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-popover-container',
  styleUrl: './container.scss',
  templateUrl: './container.html',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  host: {
    class: 'x-popover',
  },
})
export class XPopoverContainer {
  readonly #target = inject(XPopoverTarget);
  readonly #popover = inject(X_POPOVER);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly injector = inject(INJECTOR);
  readonly content = computed(() => typedOutlet(this.#target.content()));
  readonly close = () => this.#target.toggle(false);

  constructor() {
    this.#popover.keydownEvents
      .pipe(
        filter(e => isPureEscape(e) || e.key === 'Tab' || (e.shiftKey && e.key === 'Tab')),
        takeUntilDestroyed()
      )
      .subscribe(() => this.#target.focus());

    afterNextRender(() => {
      if (!this.#target.autoFocus()) {
        return;
      }

      const focusableEl = getFocusableElement(this.#el);

      if (focusableEl) {
        focusableEl.focus();
      }
    });
  }
}
