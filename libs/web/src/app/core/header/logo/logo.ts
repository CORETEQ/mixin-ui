import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-logo',
  templateUrl: './logo.html',
  imports: [RouterLink],
  host: { class: 'docs-logo' },
})
export class DocsLogo {}
