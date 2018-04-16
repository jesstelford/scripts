import sourceFiles from '../../source-files';
import executor from '../../executor';
import { prettierOptions } from '../../config';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  executor()
    .command('prettier-eslint', [...prettierOptions, '--write', thingsToLint])
    .run();
};
