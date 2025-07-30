import { Directive, HostAttributeToken, TemplateRef, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ng-template[docsHint]',
})
export class DocsHint {
  readonly content = inject(TemplateRef);
  readonly for = inject(new HostAttributeToken('docsHint'));
}
