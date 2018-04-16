const execa = require('execa');
const npmRunPath = require('npm-run-path');

export default (command, args, opts = {}) =>
  execa(command, args, {
    // Simulate running this command from within an npm script
    env: npmRunPath.env(),
    stdio: 'inherit',
    ...opts,
  })
    .then(({ code }) => {
      process.exit(code);
    })
    .catch(({ code }) => {
      process.exit(code);
    });
