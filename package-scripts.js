module.exports = {
  scripts: {
    default: 'node docco.js',
    test: {
      default: {
        script: 'jest --watch',
        description: 'Run jest in watch mode',
      },
    },
  },
};
