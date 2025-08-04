import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { provideButtonOptions, XButton, XIcon, XTooltip } from '@mixin-ui/kit';
import { DocsCode } from '../code';
import { DocsCopy } from '../copy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-snippet',
  imports: [XButton, XIcon, DocsCode, XTooltip, DocsCopy],
  styleUrl: './snippet.scss',
  templateUrl: './snippet.html',
  viewProviders: [
    provideButtonOptions({
      variant: 'ghost',
      color: 'neutral',
      size: 'sm',
    }),
  ],
  host: {
    class: 'docs-snippet',
  },
})
export class DocsSnippet {
  readonly codeEl = viewChild(DocsCode, { read: ElementRef });

  readonly code = input<string>('');
  readonly withHeader = input(false, { transform: booleanAttribute });
  readonly activeIndex = model<number>(0);
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly justify = input<'start' | 'center' | 'end'>('center');
  readonly height = input<'min' | 'auto'>('min');
  readonly clipboardText = computed(() => this.codeEl()?.nativeElement.textContent || '');

  setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }
}
