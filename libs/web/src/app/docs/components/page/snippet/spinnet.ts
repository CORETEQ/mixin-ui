import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  Directive,
  forwardRef,
  input,
  model,
  Signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { XButton, XIcon, XTooltip } from '@mixin-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-snippet',
  imports: [XIcon, XButton, XTooltip],
  styleUrl: './snippet.scss',
  templateUrl: './snippet.html',
  host: {
    class: 'docs-snippet',
  },
})
export class DocsSnippet {
  readonly tabs = contentChildren(DocsSnippetContent);
  readonly withHeader = input(false, { transform: booleanAttribute });
  readonly showButtons = input(true, { transform: booleanAttribute });
  readonly activeIndex = model<number>(0);
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly justify = input<'start' | 'center' | 'end'>('center');
  readonly height = input<'min' | 'auto'>('min');
  readonly figmaUrl = input<string>();
  readonly activeTab = computed(() => this.tabs().at(this.activeIndex()));
  readonly content = computed(() => this.activeTab()?.template());

  setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }
}

@Directive()
export abstract class DocsSnippetContent {
  abstract readonly type: 'preview' | 'code';
  abstract readonly name: Signal<string | undefined>;
  abstract readonly icon: Signal<string>;
  abstract readonly template: Signal<TemplateRef<unknown>>;
}

@Component({
  selector: 'docs-snippet-code',
  template: '<ng-template><ng-content/></ng-template>',
  providers: [
    {
      provide: DocsSnippetContent,
      useExisting: forwardRef(() => DocsSnippetCode),
    },
  ],
})
export class DocsSnippetCode extends DocsSnippetContent {
  readonly type = 'code';
  readonly template = viewChild.required(TemplateRef);
  readonly name = input<string>();
  readonly i = input<string>('', { alias: 'icon' });
  readonly icon = computed(() => this.i() || this.fallbackIcon);

  get fallbackIcon(): string {
    const name = this.name();

    if (name?.includes('.html')) {
      return 'html';
    }

    if (name?.includes('.ts')) {
      return 'ts';
    }

    return '';
  }
}
