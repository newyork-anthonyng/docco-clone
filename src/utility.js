const parseLines = (content) => {
  const results = [];

  let currentSection = {
    codeText: '',
    docText: '',
  };
  for (let i = 0; i < content.length; i++) {
    const currentLine = content[i].trim();

    if (currentLine.match(/^\/\//)) {
      const text = currentLine.replace(/\/\/\s*/g, '');

      // if continuation of another line of comments
      if (currentSection.docText) {
        currentSection.docText += `\n${text}`;
      // else new line of comment
      } else {
        currentSection.docText = `${text}`;
      }
    } else {
      currentSection.codeText = currentLine;

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
