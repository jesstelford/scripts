import sourceFiles from '../../source-files';
import executor from '../../executor';
import { eslintOptions } from '../../config';

export default (file, { _: unknownArgs }) => {
  const thingsToLint = sourceFiles([file].concat(unknownArgs));

  executor()
    .command('eslint', [...eslintOptions, ...thingsToLint])
    .run();
};
