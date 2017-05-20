const path = {
  join: jest.fn((a, b, c, d) => {
    return `${a}/${b}/${c}/${d}`;
  }),
  basename: jest.fn(),
};

beforeEach(() => {
  path.join.mockClear();
  path.basename.mockClear();
});

module.exports = path;
