import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ViewEncapsulation,
} from '@angular/core';
import { XMapPipe, XTypedOutletPipe } from '@mixin-ui/cdk';
import { DocsAbstractApiItem, DocsApiKind } from './types';

const HEADERS: Record<DocsApiKind, ReadonlyArray<string>> = {
  input: ['name', 'type', 'default'],
  output: ['event', 'type', 'description'],
  class: ['class', 'description'],
  var: ['variable', 'description'],
  slot: ['name', 'context', 'description'],
  option: ['name', 'type', 'default'],
  param: [],
} as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-api-table',
  imports: [TitleCasePipe, XMapPipe, XTypedOutletPipe, NgTemplateOutlet],
  styleUrl: './api-table.scss',
  templateUrl: './api-table.html',
  host: { class: 'docs-api-table' },
})
export class DocsApiTable {
  protected readonly items = contentChildren(DocsAbstractApiItem);
  protected readonly kind = computed(() => this.items().at(0)?.kind || 'input');
  protected readonly headers = computed(() => HEADERS[this.kind()]);
  protected readonly headerWidth = (colIndex: number) => ({ 0: 30, 1: 35 }[colIndex]);
}
