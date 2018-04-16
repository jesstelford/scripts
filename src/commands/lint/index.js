import sourceFiles from '../../source-files';
import executor from '../../executor';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  console.log('linting', thingsToLint);

  executor()
    .command('eslint', [thingsToLint])
    .run();
};
