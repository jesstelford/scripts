const execa = require('execa');
const npmRunPath = require('npm-run-path');

export default (command, args, opts = {}, done = () => {}) =>
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
