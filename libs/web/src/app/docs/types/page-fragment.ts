import { UrlCreationOptions } from '@angular/router';
import { DocsNavItem } from './nav-item';

export interface DocsPageFragment
  extends Pick<DocsNavItem, 'title' | 'routerLink'>,
    Readonly<UrlCreationOptions> {
  readonly level: number;
}
