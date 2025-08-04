import {
  DocsApiTable,
  DocsClass,
  DocsInput,
  DocsOption,
  DocsParam,
  DocsSlot,
  DocsVar,
} from './api';
import { DocsCode } from './code';
import { DocsFragment } from './fragment';
import { DocsSnippet } from './snippet';
import { DocsPageRoot } from './root';

export const DocsPage = [
  DocsPageRoot,
  DocsFragment,
  DocsSnippet,
  DocsCode,
  DocsApiTable,
  DocsInput,
  DocsClass,
  DocsVar,
  DocsParam,
  DocsSlot,
  DocsOption,
] as const;
