const npsUtils = require('nps-utils');
const concurrent = npsUtils.concurrent;

module.exports = {
  scripts: {
    default: 'node docco.js',
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
    },
    lint: {
      // default: 'eslint src/*.js',
      default: '',
    },
    validate: {
      description: '👌 Make sure things look good before committing',
      default: concurrent.nps('lint', 'test'),
    },
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      default: 'git-cz',
    },
    reportCoverage: {
      description: 'Report test coverage to codecov',
      default: 'codecov',
    },
  },
};
