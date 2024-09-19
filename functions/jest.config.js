/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
  },
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