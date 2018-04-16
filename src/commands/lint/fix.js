import sourceFiles from '../../source-files';
import execute from '../../execute';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  execute('prettier-eslint', ['--single-quote', '--trailing-comma=es5', '--write', thingsToLint]);
};
