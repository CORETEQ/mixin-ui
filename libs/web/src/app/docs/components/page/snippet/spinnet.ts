import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { XButton, XIcon, XTooltip } from '@mixin-ui/kit';
import { DocsCode } from '../code';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-snippet',
  imports: [XButton, XIcon, DocsCode, XTooltip],
  styleUrl: './snippet.scss',
  templateUrl: './snippet.html',
  host: {
    class: 'docs-snippet',
  },
})
export class DocsSnippet {
  readonly code = input<string>('');
  readonly withHeader = input(false, { transform: booleanAttribute });
  readonly activeIndex = model<number>(0);
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly justify = input<'start' | 'center' | 'end'>('center');
  readonly height = input<'min' | 'auto'>('min');

  setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }
}
