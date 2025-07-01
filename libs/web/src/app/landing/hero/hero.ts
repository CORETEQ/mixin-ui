import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { XIcon } from '@mixin-ui/kit';
import { RouterLink } from '@angular/router';

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
      const circle = document.getElementById('mixin-circle')!;

      let lastScrollY = window.scrollY;
      let currentRotation = 0;
      let isAnimating = false;
      const rotationSensitivity = 0.5;

      circle.addEventListener('animationend', () => {
        circle.style.animationDuration = '0ms';
      });

      function updateRotation() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        currentRotation += scrollDelta * rotationSensitivity;
        circle.style.transform = `rotate(${currentRotation}deg)`;
        lastScrollY = currentScrollY;
      }

      function onScroll() {
        if (!isAnimating) {
          requestAnimationFrame(() => {
            updateRotation();
            isAnimating = false;
          });
          isAnimating = true;
        }
      }

      // Оптимизированное событие скролла
      let scrollTimeout: any;

      window.addEventListener(
        'scroll',
        () => {
          onScroll();

          // Добавляем небольшое затухание после остановки скролла
          clearTimeout(scrollTimeout);

          scrollTimeout = setTimeout(() => {
            circle.style.transition = 'transform 0.3s ease-out';
            setTimeout(() => {
              circle.style.transition = 'transform 0.1s ease-out';
            }, 300);
          }, 150);
        },
        { passive: true }
      );

      // Инициализация
      updateRotation();
    });
  }
}
