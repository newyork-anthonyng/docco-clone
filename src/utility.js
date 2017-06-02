const parseLines = (content) => {
  const results = [];

  let currentSection = {
    codeText: '',
    docText: '',
  };
  for (let i = 0; i < content.length; i++) {
    const currentLine = content[i].trim();

    if (currentLine.match(/^\/\//)) {
    // handle single line comments
      const text = currentLine.replace(/\/\/\s*/g, '');

      // if continuation of another line of comments
      if (currentSection.docText) {
        currentSection.docText += `\n${text}`;
      // else new line of comment
      } else {
        currentSection.docText = `${text}`;
      }
    } else if (currentLine.match(/^\/\*|^\*|^\*\//)) {
      // handle multiline comments
      // the Regular Expression matches /*, *, and */
      const text = currentLine.replace(/\/|\*/g, '').trim();

      if (currentLine.match(/^\/\*/)) {
        currentSection.docText = text;
      } else {
        currentSection.docText += `\n${text}`;
      }
    } else {
      // handle source code
      currentSection.codeText = content[i];

      results.push(currentSection);
      currentSection = {
        codeText: '',
        docText: '',
      };
    }
  }

  if (currentSection.codeText || currentSection.docText) {
    results.push(currentSection);
  }
  return results;
};

module.exports = {
  parseLines,
};
