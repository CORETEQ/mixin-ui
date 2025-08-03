import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { VERSION } from '@mixin-ui/cli';
import { XButton, XIcon } from '@mixin-ui/kit';
import { fromRouterEvent, observe } from '@mixin-ui/cdk';
import { DocsSidebar } from '@/docs/components/sidebar';
import { environment } from './env';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, RouterLink, XIcon, XButton, DocsSidebar],
  host: {
    class: 'flex flex-col bg-white',
  },
})
export class App {
  readonly version = VERSION;
  readonly githubUrl = environment.githubUrl;
  readonly releaseUrl = `${this.githubUrl}/releases/tag/v${this.version}`;

  readonly menuOpen = signal(false);

  constructor() {
    observe(fromRouterEvent(NavigationEnd), () => {
      this.menuOpen.set(false);
    });
  }
}
