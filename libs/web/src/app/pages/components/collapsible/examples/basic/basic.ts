import { Component, signal } from '@angular/core';
import { XButton, XCollapsible, XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-collapsible-basic-example',
  imports: [XCollapsible, XButton, XIcon],
  template: `
    <div class="flex flex-col items-center gap-6 pt-4">
      <button x-btn class="w-fit" (click)="open.set(!open())">
        Toggle collapsible
        <x-icon size="16" src="chevron-down" />
      </button>

      <x-collapsible class="w-full" [open]="open()">
        <div
          class="block w-full p-4 text-md leading-7 rounded-lg border-dashed border bg-[#FFF] border-[#DDD]"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </div>
      </x-collapsible>
    </div>
  `,
})
export class CollapsibleBasicExample {
  readonly open = signal(false);
}
