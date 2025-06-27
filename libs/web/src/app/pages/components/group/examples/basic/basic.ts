import { Component } from '@angular/core';
import { XButton, XGroup, XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-group-basic-example',
  templateUrl: './basic.html',
  imports: [XGroup, XButton, XIcon],
})
export class GroupBasicExample {}
