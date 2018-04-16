import sourceFiles from '../../source-files';
import execute from '../../execute';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  console.log('linting', thingsToLint);

  execute('eslint', [thingsToLint]);
};
