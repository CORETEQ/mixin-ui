import { ChangeDetectionStrategy, Component, linkedSignal, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { VERSION } from '@mixin-ui/cli';
import { XButton, XIcon } from '@mixin-ui/kit';
import { fromRouterEvent } from '@mixin-ui/cdk';
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
  readonly orgName = environment.orgName;
  readonly githubUrl = environment.githubUrl;
  readonly releaseUrl = `${this.githubUrl}/releases/tag/v${this.version}`;

  readonly menuOpen = linkedSignal(
    toSignal(fromRouterEvent(NavigationEnd).pipe(map(() => false)), {
      initialValue: false,
      equal: () => false,
    })
  );
}
