/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    '__tests__/mock/'
  ],
  coveragePathIgnorePatterns: [
    '__tests__/mock/'
  ]
};