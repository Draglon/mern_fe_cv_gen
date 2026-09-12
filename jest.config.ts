import type { Config } from "jest";
import nextJest from "next/jest.js";
 
const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/tests/.*\\.spec\\.ts$",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/middleware.ts",
    "!src/app/**",
    "!src/i18n/*.ts",
    "!src/lib/constants/props/**",
    "!src/store/hooks.ts",
    "!src/store/store.ts",
    "!src/store/**/actions.ts",
    "!src/store/**/types.ts",
    "!src/store/**/index.ts",
    "!src/store/**/operations/index.ts",
    "!src/views/shared/ModalRoot/modalComponents.ts",
    "!src/views/UIKit/**",
    "!tests/**",
  ],
};

export default createJestConfig(config);