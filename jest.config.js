// eslint-disable-next-line
module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['js', 'node'],
};
