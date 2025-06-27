import { Component, signal } from '@angular/core';
import { XSelect } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-multiple-example',
  templateUrl: './multiple.html',
  imports: [XSelect, FormsModule],
})
export class SelectMultipleExample {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly value = signal(['Angular', 'React', 'Vue']);
}
