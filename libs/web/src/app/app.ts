import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VERSION } from '@mixin-ui/cli';
import { XButton, XIcon } from '@mixin-ui/kit';

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
              <span
                class="text-[#09090B]"
                style="font-family: ui-monospace, monospace; letter-spacing: -0.5px"
              >
                {{ version }}
              </span>
            </div>
          </div>

          <div class="flex items-center">
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
        </div>
      </div>
    </div>

    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink, XIcon, XButton],
  host: { class: 'app-layout' },
})
export class App {
  readonly version = VERSION;
}
