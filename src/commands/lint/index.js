import sourceFiles from '../../source-files';
import executor from '../../executor';
import { eslintOptions } from '../../config';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  console.log('linting', thingsToLint);

  executor()
    .command('eslint', [...eslintOptions, thingsToLint])
    .run();
};
