import type { RouterLink } from '@angular/router';

export interface DocsNavItem {
  readonly title: string;
  readonly section?: string;
  readonly icon?: string;
  readonly disabled?: boolean;
  readonly routerLink?: RouterLink['routerLink'];
  readonly children?: DocsNavItem[];
}
