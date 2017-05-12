const commander = require('commander');
const path = require('path');
const chalk = require('chalk');
const _ = require('underscore');
const utility = require('./utility');
const highlightjs = require('highlightjs');
const fse = require('fs-extra');

const log = console.log; // eslint-disable-line no-console

const Docco = (function Docco() {
  const createDocForFile = (sourceFile) => {
    // If the source file exists
    fse.pathExists(sourceFile)
      .then((exists) => {
        if (!exists) return;

        // read each file and parse its content
        const output = fse.readFileSync(sourceFile).toString();
        const sections = utility.parseLines(output.split('\n'));
        const destination = path.join('docs', `${path.basename(sourceFile, '.js')}.html`);

        // this is the template that will be used from `resources/docco.jst'`
        const templateSource = fse.readFileSync(path.join('resources', 'docco.jst')).toString();
        const template = _.template(templateSource);

        // create the HTML for the code section
        for (let i = 0; i < sections.length; i++) {
          const currentSection = sections[i];

          const code = highlightjs.highlight('js', currentSection.codeText).value;
          currentSection.codeHtml = `<pre>${code}</pre>`;
        }
        const html = template({ sections });

        // create the HTML file
        fse.writeFile(destination, html, (err) => {
          if (err) console.error(err); // eslint-disable-line no-console
        });
      });
  };

  const complete = () => {
    // copy CSS files over
    fse.copy(path.join('resources', 'docco.css'), path.join('docs', 'docco.css'))
      .then(() => {
        log('🎂 Finished');
      });
  };

  const run = () => {
    commander.parse(process.argv);
    const sourceFiles = commander.args;

    if (commander.args.length === 0) {
      log(chalk.blue(commander.helpInformation()));
      return;
    }

    log(chalk.green('🏃 Running!'));

    // create the output folder
    fse.ensureDirSync('docs');

    // Create documentation for each source file
    for (let i = 0; i < sourceFiles.length; i++) {
      createDocForFile(sourceFiles[i]);
    }

    // Copy resource files over
    complete();
  };

  return {
    run,
  };
}());

module.exports = Docco;
Docco.run();
