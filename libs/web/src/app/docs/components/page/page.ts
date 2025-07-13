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
import { DocsSnippet, DocsSnippetCode } from './snippet';
import { DocsPageRoot } from './root';

export const DocsPage = [
  DocsPageRoot,
  DocsFragment,
  DocsSnippet,
  DocsSnippetCode,
  DocsCode,
  DocsApiTable,
  DocsInput,
  DocsClass,
  DocsVar,
  DocsParam,
  DocsSlot,
  DocsOption,
] as const;
