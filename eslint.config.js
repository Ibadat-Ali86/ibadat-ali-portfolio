import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', '.vercel/**', 'node_modules/**', 'docs/portfolio-handoff/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'no-console': 'off'
    }
  }
];
