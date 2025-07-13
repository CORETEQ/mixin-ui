import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Footer } from './footer';
import { Hero } from './hero';
import { Features } from './features';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  styleUrl: './index.scss',
  templateUrl: './index.html',
  imports: [Footer, Hero, Features],
})
export default class Landing {}
