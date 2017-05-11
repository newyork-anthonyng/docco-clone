const utility = require('./utility');

describe('utility.parseLines', () => {
  it('should parse one line of code', () => {
    const content = [
      `console.log('abc');`,
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should parse multiple lines of code', () => {
    const content = [
      `console.log('abc');`,
      `console.log('def');`,
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should parse one line of comments', () => {
    const content = [
      '// todo1',
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should parse multiple lines of comments', () => {
    const content = [
      '// todo1',
      '// todo2',
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should handle one comment before one line of code', () => {
    const content = [
      '// todo1',
      `console.log('abc');`,
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should handle multiple comments before one line of code', () => {
    const content = [
      '// todo1',
      '// todo2',
      `console.log('abc');`,
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });

  it('should handle multiple comments and lines of code', () => {
    const content = [
      '// todo1',
      '// todo2',
      `console.log('abc');`,
      '// todo3',
      '// todo4',
      `console.log('def');`,
    ];
    const result = utility.parseLines(content);

    expect(result).toMatchSnapshot();
  });
});
