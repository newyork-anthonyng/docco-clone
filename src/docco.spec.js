/* eslint-disable no-console, no-global-assign */
/*
 * Mock modules
 */

console = {
  log: jest.fn(),
};
jest.mock('path');
jest.mock('fs-extra');

const fse = require('fs-extra');
const docco = require('./docco');

beforeEach(() => {
  console.log.mockClear();
});

describe('createDocForFile', () => {
  it('should log error when source file was not found', () => {
    fse.pathExists = jest.fn(() => Promise.resolve(false));
    const result = docco.createDocForFile('missingFile.js');

    return result.then(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log.mock.calls[0]).toMatchSnapshot();
    });
  });

  it('should log error when ', () => {
    fse.pathExists = jest.fn(() => Promise.reject());
    const result = docco.createDocForFile('invalidFile.js');

    return result.then(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log.mock.calls[0]).toMatchSnapshot();
    });
  });
});

describe('complete', () => {
  it('should copy the correct files to the correct location', () => {
    const result = docco.complete();

    expect(fse.copy).toHaveBeenCalledTimes(1);
    expect(fse.copy.mock.calls).toMatchSnapshot();
    return result;
  });
});

// describe('run');
