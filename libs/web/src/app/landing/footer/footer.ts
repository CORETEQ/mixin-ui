import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  template: `
    <div class="flex w-full bg-white border-t border-[#e5e5e5]">
      <div class="app-container">
        <div class="flex items-center justify-center pt-5 pb-6 md:py-6 px-4">
          <div class="flex flex-col gap-8">
            <span class="text-sm text-center leading-6 text-[#52525B]">
              <span class="block md:inline">
                Licensed under the
                <a
                  class="font-medium text-[#1470EF] hover:underline"
                  href="https://opensource.org/license/apache-2-0"
                  target="_blank"
                  >Apache 2.0</a
                >.
              </span>
              Copyright © 2025-present.
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Footer {}
