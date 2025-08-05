import { readFileSync } from 'fs';
import { createHighlighter, DecorationItem } from 'shiki';
import { Plugin } from 'vite';

const RAW_LANG_QUERY = /\?raw&lang=[^']+/;
const LANG_QUERY = /lang=([^']+)/;
const LINE_SEPARATOR = '\n';
const LANGUAGES = ['angular-ts', 'angular-html', 'css', 'scss', 'shellscript', 'json'];
const FALLBACK_LANG = 'json';
const LIGHT_THEME = 'aurora-x';
const DARK_THEME = 'github-dark-default';
const SPOTLIGHT_REGEX = /(\/\/ \[!spotlight]|<!-- \[!spotlight] -->)/g;
const SPOTLIGHT_CLASS = 'spotlight';

export async function highlightCode(): Promise<Plugin> {
  const highlighter = await createHighlighter({
    themes: [LIGHT_THEME, DARK_THEME],
    langs: LANGUAGES,
    langAlias: {
      ts: 'angular-ts',
      html: 'angular-html',
    },
  });

  return {
    name: 'highlight-code-plugin',
    transform: (code: string, id: string): string => {
      if (!RAW_LANG_QUERY.test(id)) {
        return code;
      }

      const path = id.replace(RAW_LANG_QUERY, '');
      const lang = id.match(LANG_QUERY)?.at(1) || FALLBACK_LANG;

      if (lang === 'markdown') {
        return code;
      }

      const content = readFileSync(path).toString().trimEnd();

      const { result, decorations } = processContent(content);

      const html = highlighter.codeToHtml(result, {
        themes: {
          light: LIGHT_THEME,
          dark: DARK_THEME,
        },
        decorations,
        lang,
      });

      const processedHtml = html
        .replace(/`/g, '\\`') // Escape backticks
        .replace(/\${/g, '\\${'); // Escape interpolation

      return `export default \`${processedHtml}\`;`;
    },
  };
}

function processContent(code: string): {
  result: string;
  decorations: DecorationItem[];
} {
  const decorations: DecorationItem[] = [];
  const lines = code.split(LINE_SEPARATOR);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.match(SPOTLIGHT_REGEX)?.length) {
      continue;
    }

    lines[i] = line.replace(SPOTLIGHT_REGEX, '').trimEnd();

    decorations.push({
      start: { line: i, character: 0 },
      end: { line: i, character: lines[i].length },
      properties: { class: SPOTLIGHT_CLASS },
    });
  }

  const result = lines.join(LINE_SEPARATOR);
  return { result, decorations };
}
