import { Component, signal } from '@angular/core';
import { XPopover, XSelect } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';
import { Test } from './test';

@Component({
  selector: 'app-select-multiple-example',
  templateUrl: './multiple.html',
  imports: [XSelect, FormsModule, XPopover, Test],
})
export class SelectMultipleExample {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly value = signal(['Angular', 'React', 'Vue']);
}
