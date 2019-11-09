module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/(dist|node_modules|cypress)/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
}
