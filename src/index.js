#!/usr/bin/env node

import lint from './commands/lint';
import lintFix from './commands/lint/fix';

const sade = require('sade');

const prog = sade('jesstelford-scripts');

prog.version(require('../package.json').version);

prog
  .command('lint [file]')
  .describe([
    'Display any lint errors or warnings.',
    'If no file specified, will lint all source files as defined in package.json config.jesstelford-scripts.source.',
    'file can be a single file, or a glob pattern.',
  ])
  .example('lint                   # lint all files')
  .example('lint src/index.js      # lint a single file')
  .example('lint {src,lib}/**/*.js # lint all .js files in src/ and lib/')
  .action(lint);

prog
  .command('lint fix [file]')
  .describe([
    'Fix lint errors and format source code.',
    'If no file specified, will fix and format all source files as defined in package.json config.jesstelford-scripts.source.',
    'file can be a single file, or a glob pattern.',
  ])
  .example('lint fix                   # fix and format all files')
  .example('lint fix src/index.js      # fix and format a single file')
  .example('lint fix {src,lib}/**/*.js # fix and format all .js files in src/ and lib/')
  .action(lintFix);

prog.parse(process.argv);
