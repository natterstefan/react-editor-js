module.exports = {
  extends: [
    'eslint-config-ns',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  rules: {
    'class-methods-use-this': 0,
    'sort-keys': 0,
    '@typescript-eslint/interface-name-prefix': [
      2,
      {
        prefixWithI: 'always',
        allowUnderscorePrefix: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': 0,
  },
  overrides: [
    {
      files: ['jest.setup.ts', '*.test.ts', '*.test.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
    {
      files: [
        '.storybook',
        '**/__stories__/**/*.ts',
        '**/__stories__/**/*.tsx',
      ],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
    {
      files: ['@types/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
    {
      files: ['cypress/**/*.js', 'cypress/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['cypress/**/*.test.ts'],
      globals: {
        cy: true, // cypress
      },
      rules: {
        // because jest is not used in cypress test files
        'jest/valid-expect': 0,
        'jest/expect-expect': 0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
