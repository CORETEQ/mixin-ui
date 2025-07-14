import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  INJECTOR,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { isPureEscape, typedOutlet } from '@mixin-ui/cdk';
import { XPopover } from './popover';
import { X_POPOVER } from './providers';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-popover-container',
  styleUrl: './container.scss',
  templateUrl: './container.html',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  host: { class: 'x-popover' },
})
export class XPopoverContainer {
  readonly #popover = inject(XPopover);
  readonly #overlay = inject(X_POPOVER);

  readonly injector = inject(INJECTOR);
  readonly content = computed(() => typedOutlet(this.#popover.content()));
  readonly close = () => this.#popover.toggle(false);

  constructor() {
    this.#overlay.keydownEvents
      .pipe(filter(isPureEscape), takeUntilDestroyed())
      .subscribe(() => this.#popover.focusOrigin());
  }
}
