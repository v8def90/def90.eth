import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  eslint.configs.recommended,
  {
    ignores: ['**/ThemeToggleButton.tsx', '**/*.d.ts', '**/node_modules/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        astroHTML: true
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/order': ['error', { alphabetize: { order: 'asc' } }]
    }
  }
];
