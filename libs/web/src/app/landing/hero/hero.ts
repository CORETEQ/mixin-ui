import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { XIcon } from '@mixin-ui/kit';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  imports: [XIcon, RouterLink],
})
export class Hero {
  constructor() {
    afterNextRender(() => {
      const circle = document.getElementById('mixin-circle');

      gsap.to(circle, {
        rotation: 1800,
        duration: 2,
        ease: 'power2.out',
      });
    });
  }
}
