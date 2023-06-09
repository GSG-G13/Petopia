module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'max-len': ['error', { code: 120 }],
    'linebreak-style': 0,
    'consistent-return': 'off',
    'arrow-body-style': ['error', 'as-needed'],
  },
  ignorePatterns: ['__test__/*', 'dist/*'],
};
