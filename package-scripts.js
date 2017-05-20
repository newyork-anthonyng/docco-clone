const npsUtils = require('nps-utils');
const {
  series,
  concurrent,
  rimraf,
  mkdirp,
  copy,
} = npsUtils;

module.exports = {
  scripts: {
    default: 'node docco.js',
    test: {
      default: 'jest --coverage',
      watch: 'jest --watch',
    },
    lint: {
      default: 'eslint src/*.js',
    },
    validate: {
      description: '👌 Make sure things look good before committing',
      script: concurrent.nps('lint', 'test'),
    },
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz',
    },
    reportCoverage: {
      description: 'Report test coverage to codecov',
      script: 'codecov',
    },
    build: {
      description: 'Delete the dist directory and rebuild src code',
      script: series(
        rimraf('dist'),
        mkdirp('dist'),
        copy('src/index.js dist')
      ),
    },
  },
};
