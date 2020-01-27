const path = require('path');

module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src'],
  testRegex: '.+\\.test\\.(js|ts|tsx|jsx)$',
  collectCoverageFrom: ['**/*.(js|ts|tsx|jsx)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
    '<rootDir>/src/index.js',
    '<rootDir>/src/serviceWorker.js'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect' /* 
    '@testing-library/react/cleanup-after-each' */
  ], // setupFiles before the tests are ran
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.join(
      __dirname,
      'fileMock.js'
    ),
    '\\.(scss|css)$': path.join(__dirname, 'styleMock.js')
  },
  moduleFileExtensions: ['ts', 'jsx', 'js'],
  testEnvironment: 'jest-environment-jsdom'
};
