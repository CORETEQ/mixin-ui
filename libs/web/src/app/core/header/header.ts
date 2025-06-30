import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsLogo } from './logo';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [DocsLogo, RouterLink],
  host: { class: 'app-header' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
