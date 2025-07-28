import { Route } from '@angular/router';
import { group, page, section } from './docs/providers';
import { DocsWrapper } from './docs/components';
import Landing from './landing';

export const ROUTES: Route[] = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'components',
    pathMatch: 'full',
    redirectTo: 'components/accordion',
  },
  {
    path: '',
    component: DocsWrapper,
    data: { root: true },
    children: [
      section({
        title: 'UI Angular',
        icon: 'angular',
        children: [
          group({
            path: '',
            title: 'Documentation',
            children: [
              page({
                path: 'installation',
                title: 'Installation',
                loadComponent: () => import('./pages/installation'),
              }),
              page({
                path: 'changelog',
                title: 'Changelog',
                loadComponent: () => import('./pages/changelog'),
              }),
            ],
          }),
          group({
            path: '',
            title: 'Customization',
            children: [
              page({
                path: 'colors',
                title: 'Color palette',
                loadComponent: () => import('./pages/colors'),
              }),
            ],
          }),
          group({
            path: 'components',
            title: 'Components',
            children: [
              page({
                path: 'accordion',
                title: 'Accordion',
                loadComponent: () => import('./pages/components/accordion'),
              }),
              page({
                path: 'button',
                title: 'Button',
                loadComponent: () => import('./pages/components/button'),
              }),
              page({
                path: 'calendar',
                title: 'Calendar',
                loadComponent: () => import('./pages/components/calendar'),
              }),
              page({
                path: 'checkbox',
                title: 'Checkbox',
                loadComponent: () => import('./pages/components/checkbox'),
              }),
              page({
                path: 'collapsible',
                title: 'Collapsible',
                loadComponent: () => import('./pages/components/collapsible'),
              }),
              page({
                path: 'combobox',
                title: 'Combobox',
                loadComponent: () => import('./pages/components/combobox'),
              }),
              page({
                path: 'comparable',
                title: 'Comparable',
                loadComponent: () => import('./pages/components/comparable'),
              }),
              page({
                path: 'group',
                title: 'Group',
                loadComponent: () => import('./pages/components/group'),
              }),
              page({
                path: 'icon',
                title: 'Icon',
                loadComponent: () => import('./pages/components/icon'),
              }),
              page({
                path: 'input-date',
                title: 'Input Date',
                loadComponent: () => import('./pages/components/input-date'),
              }),
              page({
                path: 'input-mask',
                title: 'Input Mask',
                loadComponent: () => import('./pages/components/input-mask'),
              }),
              page({
                path: 'input-number',
                title: 'Input Number',
                loadComponent: () => import('./pages/components/input-number'),
              }),
              page({
                path: 'input-text',
                title: 'Input Text',
                loadComponent: () => import('./pages/components/input-text'),
              }),
              page({
                path: 'label',
                title: 'Label',
                loadComponent: () => import('./pages/components/label'),
              }),
              page({
                path: 'listbox',
                title: 'Listbox',
                loadComponent: () => import('./pages/components/listbox'),
              }),
              page({
                path: 'select',
                title: 'Select',
                loadComponent: () => import('./pages/components/select'),
              }),
              page({
                path: 'spinner',
                title: 'Spinner',
                loadComponent: () => import('./pages/components/spinner'),
              }),
              page({
                path: 'switch',
                title: 'Switch',
                loadComponent: () => import('./pages/components/switch'),
              }),
              page({
                path: 'textarea',
                title: 'Textarea',
                disabled: true,
                loadComponent: () => import('./pages/components/textarea'),
              }),
            ],
          }),
          group({
            path: 'directives',
            title: 'Directives',
            children: [
              page({
                path: 'popover',
                title: 'Popover',
                loadComponent: () => import('./pages/directives/popover'),
              }),
              page({
                path: 'separator',
                title: 'Separator',
                disabled: true,
                loadComponent: () => import('./pages/directives/separator'),
              }),
              page({
                path: 'slot',
                title: 'Slot',
                loadComponent: () => import('./pages/directives/slot'),
              }),
              page({
                path: 'tooltip',
                title: 'Tooltip',
                loadComponent: () => import('./pages/directives/tooltip'),
              }),
            ],
          }),
          group({
            path: 'services',
            title: 'Services',
            children: [
              page({
                path: 'dialog',
                title: 'Dialog',
                disabled: true,
                loadComponent: () => import('./pages/services/dialog'),
              }),
              page({
                path: 'theme',
                title: 'Theme',
                disabled: true,
                loadComponent: () => import('./pages/services/theme'),
              }),
              page({
                path: 'toaster',
                title: 'Toaster',
                disabled: true,
                loadComponent: () => import('./pages/services/toaster'),
              }),
            ],
          }),
          group({
            path: 'pipes',
            title: 'Pipes',
            children: [
              page({
                path: 'map',
                title: 'Map',
                loadComponent: () => import('./pages/pipes/map'),
              }),
              page({
                path: 'typed-outlet',
                title: 'Typed Outlet',
                loadComponent: () => import('./pages/pipes/typed-outlet'),
              }),
            ],
          }),
          group({
            path: 'utils',
            title: 'Utils',
            children: [
              page({
                path: 'operators',
                title: 'Operators',
                loadComponent: () => import('./pages/utils/operators'),
              }),
            ],
          }),
        ],
      }),
    ],
  },
];
