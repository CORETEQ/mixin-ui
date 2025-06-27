/// <reference types="vitest" />
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { highlightCode } from './tools/highlight-code-plugin';
import { globSync } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    publicDir: 'public',
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../../dist/./libs/web/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    optimizeDeps: {
      include: ['@angular/forms'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      analog({
        ssr: true,
        prerender: {
          routes: ['/', ...pages()],
        },
        liveReload: false,
        vite: {
          inlineStylesExtension: 'scss',
        },
      }),
      highlightCode(),
      nxViteTsPaths(),
      devtoolsJson(),
      tailwindcss(),
      viteStaticCopy({
        structured: false,
        targets: [
          {
            src: '../../libs/kit/icons/**/*',
            dest: 'icons',
          },
        ],
      }),
    ],
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});

const pages = () => {
  return globSync('libs/web/src/app/pages/**/index.ts').map(
    file => '/' + file.replace('libs/web/src/app/pages/', '').replace('index.ts', '')
  );
};
