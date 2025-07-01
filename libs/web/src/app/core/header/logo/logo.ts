import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { XIcon } from '@mixin-ui/kit';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-logo',
  templateUrl: './logo.html',
  imports: [RouterLink, XIcon],
})
export class DocsLogo {}
