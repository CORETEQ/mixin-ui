import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal,
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
  readonly showPreview = signal(false);
  readonly loading = signal(false);

  show(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.showPreview.set(true);
      this.loading.set(false);
    }, 800);
  }

  constructor() {
    afterNextRender(() => {
      const circle = document.getElementById('mixin-circle');

      const loadingAnimation = gsap.to(circle, {
        rotation: 1800, // 5 оборотов (360 * 5)
        duration: 2, // Общая длительность анимации
        ease: 'power2.out', // Эквивалент ease-out
      });
    });
  }
}
