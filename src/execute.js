const execa = require('execa');
const npmRunPath = require('npm-run-path');
const pMapSeries = require('p-map-series');

const noop = () => {};

export default (command, args, opts = {}, done = noop) => {
  let execaOutput;
  return execa(command, args, {
    // Simulate running this command from within an npm script
    env: npmRunPath.env(),
    stdio: 'inherit',
    ...opts,
  })
    .then((result) => {
      execaOutput = result;
      return done(null, result);
    })
    .catch((error) => {
      execaOutput = error;
      return done(error);
    })
    .then(() => {
      process.exit(execaOutput.code);
    })
    .catch(() => {
      process.exit(execaOutput.code);
    });
};

export const executor = () => {
  const commands = [];
  let mutableIndex;
  const context = {
    command(command, args, opts) {
      commands.push({ command, args, opts });
      mutableIndex = commands.length - 1;
      return context;
    },
    onSuccess(resolve) {
      commands[mutableIndex].onSuccess = resolve;
      return context;
    },
    onError(reject) {
      commands[mutableIndex].onError = reject;
      return context;
    },
    run() {
      return pMapSeries(commands, ({ command, args, opts, onSuccess, onError }) => {
        const execaPromise = execa(command, args, {
          // Simulate running this command from within an npm script
          env: npmRunPath.env(),
          stdio: 'inherit',
          ...opts,
        });

        if (onError) {
          execaPromise.catch((error) => {
            onError(error);
            return error;
          });
        }

        if (onSuccess) {
          execaPromise.then((result) => {
            onSuccess(result);
            return result;
          });
        }

        return execaPromise;
      })
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
