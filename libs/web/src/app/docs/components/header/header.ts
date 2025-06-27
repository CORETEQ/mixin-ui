import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsLogo } from './logo';

@Component({
  selector: 'docs-header',
  templateUrl: './header.html',
  imports: [DocsLogo],
  host: { class: 'docs-header' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsHeader {}
