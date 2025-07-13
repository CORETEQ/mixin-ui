import { Pipe, PipeTransform } from '@angular/core';
import { typedOutlet } from '@mixin-ui/cdk/utils';

@Pipe({ name: 'typedOutlet' })
export class XTypedOutletPipe implements PipeTransform {
  readonly transform = typedOutlet;
}
