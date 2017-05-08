const commander = require('commander');
const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const log = console.log;
const utility = require('./utility');

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
              const destination = path.join('docs', path.basename(currentFile));

              // fse.writeFile(destination, buffer, (err) => {
              //   if (err) return console.error(err);

              //   log('Mission accomplished');
              // });
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
