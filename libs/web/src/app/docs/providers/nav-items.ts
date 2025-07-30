import { inject, InjectionToken } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DocsNavItem, DocsPageStatus } from '@/docs/types';

export const DOCS_NAV_ITEMS = new InjectionToken<DocsNavItem[]>('NAV_ITEMS', {
  factory: () => {
    const root = inject(Router).config.find(({ data }) => data?.root);

    if (!root?.children) {
      return [];
    }

    return root.children.map(route => toNavItem(route));
  },
});

export const section = (
  item: Omit<Route, 'data' | 'component' | 'loadComponent' | 'loadChildren' | 'path'> & {
    icon?: string;
  }
): Route => ({
  ...item,
  path: '',
  data: { section: item.title, icon: item.icon },
});

export const group = (
  item: Omit<Route, 'data' | 'component' | 'loadComponent' | 'loadChildren'>
): Route => ({
  ...item,
});

export const page = (
  item: Omit<Route, 'data'> & {
    status?: DocsPageStatus;
    sourcePath?: string;
    disabled?: boolean;
  }
): Route => ({
  ...item,
  data: {
    ...(item.status && { status: item.status }),
    ...(item.sourcePath && { sourcePath: item.sourcePath }),
    ...(item.disabled && { disabled: item.disabled }),
  },
});

const toNavItem = (route: Route, parentPath?: string): DocsNavItem => {
  const section = route.data?.section;

  return {
    section,
    icon: route.data?.icon,
    disabled: route.data?.disabled,
    title: typeof route.title === 'string' ? route.title : 'Untitled',
    routerLink: !section ? `${parentPath ? `/${parentPath}` : ``}/${route.path ?? ''}` : ``,
    children: route.children?.map(child => toNavItem(child, route.path)),
  };
};
