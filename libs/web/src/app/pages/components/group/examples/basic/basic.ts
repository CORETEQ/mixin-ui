import { Component } from '@angular/core';
import { provideButtonOptions, XButton, XGroup, XIcon, XPopoverTarget, XTooltip } from '@mixin-ui/kit';

@Component({
  selector: 'app-group-basic-example',
  imports: [XGroup, XButton, XIcon, XTooltip, XPopoverTarget],
  providers: [provideButtonOptions({ variant: 'outline', color: 'neutral' })],
  template: `
    <div class="flex gap-3">
      <x-group>
        <button x-btn variant="outline">Button</button>
        <button x-icon
                #popover="x-popover"
                x-popover-stretch="auto"
                [x-popover]="popoverContent"
                (click)="popover.toggle(!popover.open())">
          <x-icon src="chevron-down" />
        </button>

        <ng-template #popoverContent>
          <div class="p-3">
            Hello, I am popover
          </div>
        </ng-template>
      </x-group>

      <x-group>
        <button x-icon
                x-tooltip="Align left"
                [attr.aria-pressed]="active.has('left')"
                (click)="toggle('left')">
          <x-icon src="align-left" />
        </button>
        <button x-icon
                x-tooltip="Align center"
                [attr.aria-pressed]="active.has('center')"
                (click)="toggle('center')">
          <x-icon src="align-center" />
        </button>
        <button x-icon
                x-tooltip="Align right"
                [attr.aria-pressed]="active.has('right')"
                (click)="toggle('right')">
          <x-icon src="align-right" />
        </button>
      </x-group>
    </div>
  `
})
export class GroupBasicExample {
  readonly active = new Set<string>();

  toggle(id: string) {
    if (this.active.has(id)) {
      this.active.delete(id);
    } else {
      this.active.add(id);
    }
  }
}
