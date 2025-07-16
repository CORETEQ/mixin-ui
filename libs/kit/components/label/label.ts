import { Component, Directive } from '@angular/core';

@Component({
  selector: 'label[x-label]',
  template: '<ng-content/>',
})
export class XLabel {}
