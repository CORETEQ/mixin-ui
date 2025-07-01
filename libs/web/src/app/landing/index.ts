import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Footer } from './footer';
import { Hero } from './hero';
import { Features } from './features';

import code from './code.html?raw&lang=html';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  styleUrl: './index.scss',
  templateUrl: './index.html',
  imports: [Footer, Hero, Features],
})
export default class Landing {
  code = code;
}
