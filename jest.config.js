module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  // modulePathIgnorePatterns: ["/pages/"],
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    // "^.+\\.css$": "<rootDir>/cssTransform.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
  // moduleNameMapper: {
  //   "^.+\\.module\\.(css)$": "identity-obj-proxy",
  // },
};