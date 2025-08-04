import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { typedOutlet } from '@mixin-ui/cdk';
import { XTooltip } from './tooltip';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-tooltip-container',
  styleUrl: './container.scss',
  templateUrl: './container.html',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  host: {
    role: 'tooltip',
    '[class]': '`x-tooltip x-position-${t.position()} x-variant-${t.variant()}`',
    '[class.x-with-arrow]': 't.withArrow',
    '[style.--x-offset.px]': 't.offset()',
  },
})
export class XTooltipContainer {
  readonly t = inject(XTooltip);
  readonly content = computed(() => typedOutlet(this.t.content()));
}
