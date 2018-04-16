const pkgDir = require('pkg-dir');
const path = require('path');

const packageRoot = pkgDir.sync(__dirname);
const eslintConfigFile = path.join(packageRoot, '.eslintrc');

export const prettierOptions = [
  '--single-quote',
  '--trailing-comma=es5',
  `--eslint-config-path=${eslintConfigFile}`,
];

export const eslintOptions = [`--config=${eslintConfigFile}`];
