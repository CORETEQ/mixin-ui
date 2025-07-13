import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <app-header />
    <router-outlet />
  `,
  imports: [RouterOutlet, Header],
  host: { class: 'app-layout' },
})
export class App {}
