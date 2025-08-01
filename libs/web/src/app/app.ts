import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { VERSION } from '@mixin-ui/cli';
import { XButton, XIcon } from '@mixin-ui/kit';
import { fromRouterEvent, observe } from '@mixin-ui/cdk';
import { DocsSidebar } from '@/docs/components/sidebar';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <div class="docs-banner">
      <div class="docs-banner-container">
        <div class="docs-banner-content">
          <span class="docs-banner-text"> ⚠️ Mixin UI is currently in alpha stage </span>
        </div>
      </div>
    </div>

    <div class="app-header">
      <div class="app-container">
        <div class="mx-auto px-4 flex items-center justify-between flex-1 h-14">
          <div class="flex items-center space-x-4">
            <a routerLink="/" class="flex items-center gap-x-1.5">
              <x-icon src="icons/app/mixin.svg" size="28" raw />
              <span
                class="h-[30px] text-[#09090b] text-[30px] leading-[26px] font-kumbh font-normal"
                style="-webkit-font-smoothing: subpixel-antialiased"
              >
                mixin
              </span>
            </a>
            <div class="app-header-version">
              <a
                href="https://github.com/CORETEQ/mixin-ui/releases/tag/v{{ version }}"
                target="_blank"
                class="text-[#09090B] decoration-gray-400 underline-offset-1 hover:underline"
                style="font-family: ui-monospace, monospace; letter-spacing: -0.5px"
              >
                v{{ version }}
              </a>
            </div>
          </div>

          <div class="hidden md:flex items-center">
            <nav class="items-center gap-6 text-sm flex font-medium me-6">
              <a routerLink="/installation" class="hover:underline underline-offset-2"
                >Introduction</a
              >
              <a routerLink="/components" class="hover:underline underline-offset-2">Components</a>
              <a routerLink="/colors" class="hover:underline underline-offset-2">Colors</a>
            </nav>

            <div class="h-[1.125rem] w-[1px] bg-gray-300"></div>

            <div class="flex items-center gap-1 ms-3.5">
              <a
                x-icon
                href="https://github.com/CORETEQ/mixin-ui"
                target="_blank"
                color="neutral"
                variant="ghost"
                size="md"
              >
                <x-icon src="icons/app/github.svg" size="18" />
              </a>
            </div>
          </div>

          <button
            class="md:hidden relative w-8 h-8 flex items-center justify-center"
            (click)="menuOpen.set(!menuOpen())"
            aria-label="Toggle menu"
          >
            <span
              class="absolute w-6 h-0.5 bg-gray-500 transition duration-300 ease-in-out"
              [class.translate-y-2]="!menuOpen()"
              [class.rotate-45]="menuOpen()"
            ></span>

            <span
              class="absolute w-5 h-0.5 right-1 bg-gray-500 transition duration-300 ease-in-out"
              [class.opacity-100]="!menuOpen()"
              [class.opacity-0]="menuOpen()"
            ></span>

            <span
              class="absolute w-6 h-0.5 bg-gray-500 transition duration-300 ease-in-out"
              [class.-translate-y-2]="!menuOpen()"
              [class.-rotate-45]="menuOpen()"
            ></span>
          </button>
        </div>
      </div>
    </div>

    @if (menuOpen()) {
    <docs-sidebar class="app-layout-sidebar" />
    }

    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink, XIcon, XButton, DocsSidebar],
  host: {
    class: 'app-layout',
  },
})
export class App {
  readonly version = VERSION;
  readonly menuOpen = signal(false);

  constructor() {
    observe(fromRouterEvent(NavigationEnd), () => this.menuOpen.set(false));
  }
}
