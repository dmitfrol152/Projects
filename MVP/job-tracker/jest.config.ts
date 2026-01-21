import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/app/**",
  ],
  coverageReporters: ["text", "lcov"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.test.json",
    },
  },

  moduleNameMapper: {
    ".*\\.svg\\?react$": "<rootDir>/src/__mocks__/svgMock.tsx",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/src/__mocks__/fileMock.ts",

    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
  },

  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
};

export default config;
