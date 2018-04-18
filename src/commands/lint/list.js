import sourceFiles from '../../source-files';
import executor from '../../executor';
import { prettierOptions } from '../../config';

export default (file, { _: unknownArgs }) => {
  const thingsToLint = sourceFiles([file].concat(unknownArgs));

  executor()
    .command(
      'prettier-eslint',
      [...prettierOptions, '--list-different', '--log-level=silent', ...thingsToLint],
      { stdio: 'pipe' },
    )
    .onError(({ stdout, stderr }) => {
      // Something went wrong with executing eslint/prettier
      if (stderr) {
        console.error(stderr);
        return;
      }

      const cwd = process.cwd();

      // Extract the list of files
      const files = stdout
        .split('\n')
        .filter(Boolean)
        // Prettify the path
        .map(line => (line.startsWith(cwd) ? `.${line.slice(cwd.length)}` : line))
        // Emojis, because.
        .map(line => `🛠  ${line}`);

      if (files.length) {
        console.error('\n');
        console.error(
          `Found ${files.length} file${files.length > 1 ? 's' : ''} that can be fixed:`,
        );
        console.error(files.join('\n'));
        console.error('\n');
      }
    })
    .run();
};
