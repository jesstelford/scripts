const isValidGlob = require('is-valid-glob');

export default (file) => {
  let thingsToLint = file;

  if (!file) {
    thingsToLint = process.env.npm_package_config_source;

    if (!thingsToLint) {
      // eslint-disable-next-line no-console
      console.error('Must specify either a file, or config.source in package.json');
      process.exit(1);
    }
  }

  if (!isValidGlob(thingsToLint)) {
    // eslint-disable-next-line no-console
    console.error(`${thingsToLint} isn't a valid file or glob pattern`);
    process.exit(1);
  }

  return thingsToLint;
};
