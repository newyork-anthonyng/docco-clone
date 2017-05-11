const highlightjs = require('highlightjs');

const parseLines = (content) => {
  const results = [];

  let currentSection = {
    codeText: '',
    docText: '',
  };
  for (let i = 0; i < content.length; i++) {
    console.log('line change');
    const currentLine = content[i];

    if (currentLine.match(/^\/\//)) {
      if (currentSection.docText) {
        currentSection.docText += `\n${currentLine}`;
      } else {
        currentSection.docText = `${currentLine}`;
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
