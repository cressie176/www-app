module.exports = {
  'testMatch': [
    '**/server/test/**/*.test.js?(x)',
  ],
  'testPathIgnorePatterns': [
    'node_modules',
    'server/build',
    'client',
  ],
  'testEnvironment': 'node',
};
