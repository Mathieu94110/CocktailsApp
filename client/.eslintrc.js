module.exports = {
  root: true,
  extends: 'airbnb-typescript/base',

  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/comma-dangle': [
      'off',
      {
        arrays: 'never',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'import/extensions': 'off',
    '@typescript-eslint/brace-style': 'off',
    "@typescript-eslint/no-unused-vars": "warn"
  },
};
