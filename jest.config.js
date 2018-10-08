module.exports = {
  setupTestFrameworkScriptFile: 'jest-enzyme',
  testEnvironment: 'enzyme',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^constants(.*)$': '<rootDir>/src/constants$1',
    '^fixtures(.*)$': '<rootDir>/__fixtures__$1',
    '^images(.*)$': '<rootDir>/images$1',
    '^middlewares(.*)$': '<rootDir>/src/middlewares$1',
    '^mocks(.*)$': '<rootDir>/__mocks__$1',
    '^modules(.*)$': '<rootDir>/src/modules$1',
    '^reducers(.*)$': '<rootDir>/src/reducers$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^utils(.*)$': '<rootDir>/src/utils$1'
  }
};
