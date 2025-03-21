/* eslint-env node */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/fileMocks.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMocks.js",
  },
};
