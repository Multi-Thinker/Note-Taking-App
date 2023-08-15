module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      options: {
        parser: 'babel',
      },
    },
  ],
};
