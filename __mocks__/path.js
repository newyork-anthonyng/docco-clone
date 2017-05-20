const path = {
  join: jest.fn((a, b) => {
    return `${a}/${b}`;
  }),
  basename: jest.fn(),
};

beforeEach(() => {
  path.join.mockClear();
  path.basename.mockClear();
});

module.exports = path;
