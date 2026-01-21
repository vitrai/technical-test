export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['server.js'],
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/jest.setup.js']
};
