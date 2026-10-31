import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import autoImports from './.wxt/eslint-auto-imports.mjs';
import svelteConfig from './svelte.config.mjs';

export default defineConfig(
  autoImports,
  {
    ignores: ['node_modules/', '.wxt/', 'dist/', '**/*.g.ts']
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  svelte.configs.recommended,
  svelte.configs.prettier,
  eslintConfigPrettier,
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig
      }
    }
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn'
    }
  }
);
