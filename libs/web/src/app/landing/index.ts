import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Hero } from './hero';
import { Footer } from './footer';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  styleUrl: './index.scss',
  templateUrl: './index.html',
  imports: [Hero, Footer],
})
export default class Landing {}
