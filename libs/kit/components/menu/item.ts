import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button[x-item], a[x-item]',
  templateUrl: './item.html',
  styleUrl: './item.scss',
  hostDirectives: [CdkMenuItem],
  host: {
    class: 'x-item',
    '[attr.type]': 'type',
  },
})
export class XItem {
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly type = this.#el.tagName === 'A' ? null : 'button';
}
