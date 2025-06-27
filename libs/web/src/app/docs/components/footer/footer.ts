import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XIcon } from '@mixin-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './footer.html',
  imports: [XIcon],
  selector: 'docs-footer',
  host: { class: 'docs-footer' },
})
export class DocsFooter {}
