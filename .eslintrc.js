module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
  },
  rules: {
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-void': 'off',
    'prefer-arrow-callback': 'off',
    'react/display-name': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
  },
};
