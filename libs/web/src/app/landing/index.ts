import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Footer } from './footer';

import test from './test?raw&lang=ts';
import { Hero } from './hero';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  styleUrl: './index.scss',
  templateUrl: './index.html',
  imports: [Footer, Hero],
})
export default class Landing {
  test = test;
}
