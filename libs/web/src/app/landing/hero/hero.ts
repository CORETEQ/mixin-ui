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
  imports: [XIcon, RouterLink],
  template: `
    <div class="app-container h-full">
      <div class="flex flex-col items-center justify-center h-full pt-12 pb-16">
        <div
          class="flex flex-col items-center justify-center text-center animate__animated animate__fadeIn"
        >
          <div class="px-7 flex flex-col items-start md:items-center">
            <div class="app-hero-subtitle mb-6 md:mb-8">
              <span>🚀</span> Powered by
              <a
                href="https://coreteq.sk"
                target="_blank"
                class="-ms-[0.2rem] underline decoration-[#b3b3b3] decoration-1 underline-offset-[0.15em] decoration-dotted hover:text-[#09090b]"
              >
                CoreTEQ <span class="hidden md:inline">Technology</span>
              </a>
            </div>

            <div
              class="flex flex-col md:block items-start text-[2.925rem] md:text-[4rem] md:leading-[4.75rem] font-semibold mb-6 md:mb-8 text-left md:text-center"
            >
              <span class="block md:inline leading-13.5 md:leading-[4.75rem]">Build Reliable</span>
              <span class="block md:inline leading-15 md:leading-[4.75rem]"> Interfaces —</span>
              <div class="inline md:block md:leading-[4.75rem]">
                <div class="block md:inline leading-15.5 md:leading-[4.75rem] text-left">
                  with

                  <div
                    class="inline-flex shrink-0 gap-4 items-center justify-center md:mx-0.5
                  w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] border border-[#e0e1e7]
                 align-text-bottom rounded-[14px] md:rounded-[16px]"
                  >
                    <x-icon src="icons/app/angular.svg" class="md:text-[3.5rem]" raw />
                  </div>
                  Angular
                </div>
                <div class="block md:inline leading-15.5 md:leading-[4.75rem] text-left">
                  &
                  <div
                    class="inline-flex shrink-0 gap-4 items-center justify-center mx:me-0.5
                  w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] border border-[#e0e1e7]
                 align-text-bottom rounded-[14px] md:rounded-[16px]"
                  >
                    <x-icon
                      id="mixin-circle"
                      class="md:text-[3.5rem]"
                      src="icons/app/mixin.svg"
                      raw
                    />
                  </div>
                  Mixin UI
                </div>
              </div>
            </div>

            <p
              class="max-w-[40rem] text-[#5c5c5c] text-[1rem] md:text-[1.125rem] leading-[1.5rem] md:leading-[1.75rem] text-left md:text-center mb-10"
            >
              25+ lightweight components and tools built with Angular and minimal dependencies.

              <span class="hidden md:inline">
                Build dynamic interfaces, speed up development, and deliver polished UI with a
                flexible layout system and smart utilities.
              </span>
            </p>

            <button routerLink="installation" class="app-primary-btn !w-fit" type="button">
              Browse the docs
              <x-icon src="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
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
