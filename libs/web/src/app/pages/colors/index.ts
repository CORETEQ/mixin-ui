import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';
import { TitleCasePipe } from '@angular/common';

export const COLOR_PALETTES = [
  'gray',
  'green',
  'pink',
  'purple',
  'indigo',
  'rose',
  'blue',
  'red',
  'yellow',
  'orange',
] as const;

export const COLOR_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

@Component({
  selector: 'app-colors',
  templateUrl: './index.html',
  imports: [DocsPage, TitleCasePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Colors {
  palettes = COLOR_PALETTES;
  steps = COLOR_STEPS;
}
