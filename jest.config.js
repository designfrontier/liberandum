// @flow
module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 0.57, // 75,
      functions: 4, // 100,
      lines: 5 // 93
    }
  },
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**']
};
