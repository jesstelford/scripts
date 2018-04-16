import { executor } from '../../execute';

const path = require('path');

export default () => {
  const changelogFile = path.join(process.cwd(), path.sep, 'CHANGELOG.md');

  executor()
    .command('version-changelog', [changelogFile])
    .command('changelog-verify', [changelogFile])
    .command('git', ['add', changelogFile])
    .run();
};
