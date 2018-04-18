const isValidGlob = require('is-valid-glob');
const readPkgUp = require('read-pkg-up');

export default (files) => {
  let thingsToLint = (Array.isArray(files) ? files : [files]).filter(Boolean);

  if (!thingsToLint.length) {
    if (process.env.npm_package_config_source) {
      thingsToLint = [process.env.npm_package_config_source];
    } else {
      // Try to find package.json nearest to where the command is being executed
      const { pkg } = readPkgUp.sync();

      if (!pkg || !pkg.config || !pkg.config.source) {
        // eslint-disable-next-line no-console
        console.error('Must specify either a file, or config.source in package.json');
        process.exit(1);
      }

      thingsToLint = [pkg.config.source];
    }
  }

  const validationErrors = thingsToLint.reduce((errors, thingToLint) => {
    if (!isValidGlob(thingToLint)) {
      errors.push(`${thingToLint} isn't a valid file or glob pattern`);
    }
    return errors;
  }, []);

  if (validationErrors.length) {
    // eslint-disable-next-line no-console
    console.error(validationErrors.join('\n'));
    process.exit(1);
  }

  return thingsToLint;
};
