import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

/**
 * Flat config (ESLint 10).
 *
 * `prettier` comes last and only switches off rules that would fight the
 * formatter — formatting is Prettier's job, not the linter's.
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      // Unused values are a mistake, except for the deliberate `_` discard.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      // Content files intentionally hold `null` for unconfirmed values.
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'smart'],
    },
  },

  {
    // Build scripts run in Node and are allowed to print.
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },

  prettier,
];

export default config;
