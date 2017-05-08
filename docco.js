const commander = require('commander');
const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const log = console.log;
const _ = require('underscore');
const utility = require('./utility');
const highlightjs = require('highlightjs');

const Docco = (function() {
  const run = () => {
    commander.parse(process.argv);
    const sourceFiles = commander.args;

    if (commander.args.length > 0) {
      log(chalk.green('🏃 Running!'));

      fse.ensureDirSync('docs');
      for (let i = 0; i < sourceFiles.length; i++) {
        const currentFile = sourceFiles[i];
        // check that the file exists
        fse.pathExists(currentFile)
          .then((exists) => {
            if (exists) {
              const output = fse.readFileSync(currentFile).toString();
              const sections = utility.parseLines(output.split('\n'));
              const destination = path.join('docs', path.basename(currentFile, '.js') + '.html');

              const templateSource = fse.readFileSync(path.join('resources', 'docco.jst')).toString();
              const template = _.template(templateSource);

              // console.log(sections);
              for (let i = 0; i < sections.length; i++) {
                const currentSection = sections[i];

                const code = highlightjs.highlight('js', currentSection.codeText).value;
                log(highlightjs.highlight('js', currentSection.codeText).value);
                currentSection.codeHtml = '<pre>' + code + '</pre>';
              }
              const html = template({
                title: 'Docco!',
                sections,
              });
              fse.writeFile(destination, html, (err) => {
                if (err) return console.error(err);

                // move css file over
                // console.log(path.join('resources', 'docco.css'));
                // console.log(path.join('docs', 'docco.css'));
                fse.copy(path.join('resources', 'docco.css'), path.join('docs', 'docco.css'))
                //   .then(() => {
                //     log('Mission accomplished');
                //   });
              });
            }
          });

      }

    } else {
      log(chalk.blue(commander.helpInformation()));
    }
  };

  return {
    run,
  };
})();

module.exports = Docco;
Docco.run();
