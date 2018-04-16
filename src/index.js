#!/usr/bin/env node

import lint from './commands/lint';
import lintFix from './commands/lint/fix';
import lintList from './commands/lint/list';
import versionCommand from './commands/version';

const sade = require('sade');

const prog = sade('jesstelford-scripts');

const { version } = require('../package.json');

prog.version(version);

prog
  .command('lint [file]')
  .describe([
    'Display any lint errors or warnings.',
    'If no file specified, will lint all source files as defined in package.json config.jesstelford-scripts.source.',
    'file can be a single file, or a glob pattern.',
  ])
  .example('lint                   # lint files defined in config.source')
  .example('lint src/index.js      # lint a single file')
  .example('lint {src,lib}/**/*.js # lint all .js files in src/ and lib/')
  .action(lint);

prog
  .command('lint fix [file]')
  .describe([
    'Fix lint errors and format source code.',
    'If no file specified, will fix and format all source files as defined in package.json config.source.',
    'file can be a single file, or a glob pattern.',
  ])
  .example('lint fix                   # fix and format files defined in config.source')
  .example('lint fix src/index.js      # fix and format a single file')
  .example('lint fix {src,lib}/**/*.js # fix and format all .js files in src/ and lib/')
  .action(lintFix);

prog
  .command('lint list [file]')
  .describe([
    'List file(s) that have linting or formatting errors.',
    'If no file specified, will execute on all source files as defined in package.json config.source.',
    'Particularly useful when combined with `lint-staged` and `husky`',
    'file can be a single file, or a glob pattern.',
  ])
  .example('lint list                   # execute on files defined in config.source')
  .example('lint list src/index.js      # execute on a single file')
  .example('lint list {src,lib}/**/*.js # execute on all .js files in src/ and lib/')
  .action(lintList);

prog
  .command('version')
  .describe([
    'Verify, update and commit CHANGELOG.md',
    'Runs: `version-changelog CHANGELOG.md && changelog-verify CHANGELOG.md && git add CHANGELOG.md`',
  ])
  .action(versionCommand);

prog.parse(process.argv);
