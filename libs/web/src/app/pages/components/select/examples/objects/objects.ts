import { Component } from '@angular/core';
import { XSelect } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-objects-example',
  templateUrl: './objects.html',
  imports: [XSelect, FormsModule],
})
export class SelectObjectsExample {
  value = { value: 'us', label: 'United States' };
  compareFn = (o1: any, o2: any) => o1 && o2 && o1.value === o2.value;
  options = [
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
  ];
}
