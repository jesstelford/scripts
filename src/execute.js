const execa = require('execa');
const npmRunPath = require('npm-run-path');
const pMapSeries = require('p-map-series');

const noop = () => {};

export default (command, args, opts = {}, done = noop) => {
  execa(command, args, {
    // Simulate running this command from within an npm script
    env: npmRunPath.env(),
    stdio: 'inherit',
    ...opts,
  })
    .then((result) => {
      done(null, result);
      process.exit(result.code);
    })
    .catch((error) => {
      done(error);
      process.exit(error.code);
    });
};

export const executor = () => {
  const commands = [];
  const context = {
    command(command, args, opts) {
      commands.push({ command, args, opts });
      return context;
    },
    run() {
      return pMapSeries(
        commands,
        ({ command, args, opts }) => (
          execa(command, args, {
            // Simulate running this command from within an npm script
            env: npmRunPath.env(),
            stdio: 'inherit',
            ...opts,
          })
        ),
      )
        .then((results) => {
          // exit the process with the final exit code
          process.exit(results[results.length - 1].code);
        })
        .catch((error) => {
          process.exit(error.code);
        });
    },
  };
  return context;
};
