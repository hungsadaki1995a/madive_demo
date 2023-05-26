module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    // Disable warning missing deps in useEffect, useMemo, useCallback
    'react-hooks/exhaustive-deps': 'off',
    // Rule for using single quote, quote inside quote
    quotes: ['error', 'single', { avoidEscape: true }],
    // Rule for disable import react in jsx file
    'react/react-in-jsx-scope': 'off',
    // Rule for disable require component display name
    'react/display-name': 'off',
    // Next two lines are config for section 4.3 rules
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    // Next line is config for section 4.6, second rule
    'react/jsx-boolean-value': 'error',
    // According to my research, for img tag, we should provide only alt or role
    // Next line is config for section 4.6, third rule
    'jsx-a11y/alt-text': ['error', { elements: ['img'] }],
    // Next line is config for section 4.6, fourth rule
    'jsx-a11y/img-redundant-alt': ['error', { elements: ['img'], words: ['image', 'photo', 'picture'] }],
    // Next two lines are config for section 4.6, fifth rule
    'jsx-a11y/no-redundant-roles': ['error', { nav: ['navigation'] }],
    'jsx-a11y/aria-role': ['error', { allowedInvalidRoles: ['text'], ignoreNonDOM: true }],
    // Next line is config for section 4.6, sixth rule
    'jsx-a11y/no-access-key': 'error',
    // Next line is config for section 4.9
    'react/self-closing-comp': 'error',
    // Next two lines are config for section 4.10 rules
    'prefer-arrow-callback': 'error',
    'no-underscore-dangle': ['error', { enforceInMethodNames: true }],
    // Next line is config for section 5.5.2
    'no-new-object': 'error',
    // Next line is config for section 5.5.3
    eqeqeq: 'error',
    // Next line is config for section 5.5.4
    radix: 'error',
    // Next line is config for section 5.5.5
    '@typescript-eslint/no-for-in-array': 'error',
    // Next line is config for section 5.5.7
    'no-eval': 'error',
    // Next line is config for section 5.5.8
    'no-implied-eval': 'error',
    // Next line is config for section 5.5.9
    'no-new-func': 'error',
    // Next line is config for section 5.5.10
    'no-extend-native': 'error',
    // Next line is config for section 5.5.11
    '@typescript-eslint/no-this-alias': 'error',
    // Next line is config for section 5.5.12
    semi: ['error', 'always'],
  },
};
