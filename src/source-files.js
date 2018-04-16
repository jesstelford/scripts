const isValidGlob = require('is-valid-glob');
const readPkgUp = require('read-pkg-up');

export default (file) => {
  let thingsToLint = file;

  if (!file) {
    thingsToLint = process.env.npm_package_config_source;

    if (!thingsToLint) {
      // Try to find package.json nearest to where the command is being executed
      const { pkg } = readPkgUp.sync();

      if (!pkg || !pkg.config || !pkg.config.source) {
        // eslint-disable-next-line no-console
        console.error('Must specify either a file, or config.source in package.json');
        process.exit(1);
      }

      thingsToLint = pkg.config.source;
    }
  }

  if (!isValidGlob(thingsToLint)) {
    // eslint-disable-next-line no-console
    console.error(`${thingsToLint} isn't a valid file or glob pattern`);
    process.exit(1);
  }

  return thingsToLint;
};
