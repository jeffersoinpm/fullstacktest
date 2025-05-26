module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  collectCoverage: true,
  coverageReporters: ['html'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json']
};
