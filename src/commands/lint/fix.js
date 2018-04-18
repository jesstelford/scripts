import sourceFiles from '../../source-files';
import executor from '../../executor';
import { prettierOptions } from '../../config';

export default (file, { _: unknownArgs }) => {
  const thingsToLint = sourceFiles([file].concat(unknownArgs));

  executor()
    .command('prettier-eslint', [...prettierOptions, '--write', ...thingsToLint])
    .run();
};
