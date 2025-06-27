import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsLogo } from './logo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-header',
  templateUrl: './header.html',
  imports: [DocsLogo, RouterLink],
  host: { class: 'docs-header' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsHeader {}
