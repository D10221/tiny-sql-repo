module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  runner: "@jest-runner/electron/main",
  testEnvironment: "node",
};
