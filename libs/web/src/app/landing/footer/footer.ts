import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  template: `
    <div class="flex w-full bg-white border-t border-[#e5e5e5]">
      <div class="app-container">
        <div class="flex items-center justify-center py-6 px-4">
          <div class="flex flex-col gap-8">
            <span class="text-sm text-[#52525B]"> Copyright © 2025 Mixin UI </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Footer {}
