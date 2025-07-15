import { Component, signal } from '@angular/core';
import {XListbox, XOption, XPopover, XSelect} from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-multiple-example',
  templateUrl: './multiple.html',
  imports: [XSelect, FormsModule, XListbox, XPopover, XOption],
})
export class SelectMultipleExample {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly value = signal(['Angular', 'React', 'Vue']);
}
