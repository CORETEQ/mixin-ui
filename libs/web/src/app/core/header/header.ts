import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsLogo } from './logo';
import { MIXIN_UI_VERSION } from '../version';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  imports: [DocsLogo, RouterLink],
  host: { class: 'app-header' },
})
export class Header {
  readonly version = MIXIN_UI_VERSION;
}
