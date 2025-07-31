import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XIcon } from '@mixin-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  imports: [XIcon, RouterLink],
  template: `
    <div class="app-container h-full">
      <div class="app-hero-section">
        <div class="app-hero-title animate__animated animate__fadeIn">
          <div class="app-hero-subtitle">
            <span>🚀</span> Powered by
            <a href="https://coreteq.sk" target="_blank" class="app-hero-subtitle-link"
              >CoreTEQ Technology</a
            >
          </div>

          <div class="app-hero-h1">
            <div>Build Reliable Interfaces —</div>
            <div class="inline-flex items-center gap-4">
              with
              <div class="app-hero-h1-decoration">
                <x-icon size="46" src="icons/app/angular.svg" raw />
              </div>
              Angular &
              <div class="app-hero-h1-decoration">
                <x-icon
                  id="mixin-circle"
                  class="app-hero-animated-decor"
                  size="56"
                  src="icons/app/mixin.svg"
                  raw
                />
              </div>
              Mixin UI
            </div>
          </div>

          <p class="app-hero-description">
            25+ lightweight components and tools built with Angular and minimal dependencies. Build
            dynamic interfaces, speed up development, and deliver polished UI with a flexible layout
            system and smart utilities.
          </p>

          <div class="mt-10">
            <button routerLink="installation" class="app-primary-btn" type="button">
              Browse the docs
              <x-icon src="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Hero {}
