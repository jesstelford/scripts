import sourceFiles from '../../source-files';
import executor from '../../executor';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  executor()
    .command('prettier-eslint', ['--single-quote', '--trailing-comma=es5', '--write', thingsToLint])
    .run();
};
