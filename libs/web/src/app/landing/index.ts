import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Footer } from './footer';
import { Hero } from './hero';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  imports: [Footer, Hero],
  host: { class: 'app-landing' },
  template: `
    <div class="app-landing-content">
      <app-hero />
      <app-footer />
    </div>
  `,
})
export default class Landing {}
