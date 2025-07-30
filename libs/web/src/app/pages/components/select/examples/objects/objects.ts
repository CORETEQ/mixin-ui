import { Component } from '@angular/core';
import { XListbox, XOption, XPopover, XSelect, XValue } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-objects-example',
  templateUrl: './objects.html',
  imports: [XSelect, FormsModule, XPopover, XOption, XListbox, XValue],
})
export class SelectObjectsExample {
  value = { value: 'us', label: 'United States' };
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
