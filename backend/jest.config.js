/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(module1|module2)/)',
  ],
};

export default config;