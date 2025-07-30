import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VERSION } from '@mixin-ui/cli';
import { DocsLogo } from './logo';

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
  readonly version = VERSION;
}
