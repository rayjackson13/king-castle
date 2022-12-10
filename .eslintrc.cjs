module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended'
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['build/'],
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  rules: {
    indent: ['warn', 2],
    semi: [2, 'always'],
    'eol-last': [2, 'always'],
    'import/newline-after-import': ['error'],
    'import/no-unresolved': [0],
    'no-mixed-spaces-and-tabs': 'error',
    '@typescript-eslint/no-empty-function': 'off'
  }
};
