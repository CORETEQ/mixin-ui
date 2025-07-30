import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-features',
  templateUrl: './features.html',
})
export class Features {}
