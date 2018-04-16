import sourceFiles from '../../source-files';
import execute from '../../execute';

export default (file) => {
  const thingsToLint = sourceFiles(file);

  execute(
    'prettier-eslint',
    [
      '--single-quote',
      '--trailing-comma=es5',
      '--list-different',
      '--log-level=silent',
      thingsToLint,
    ],
    {
      stdio: 'pipe',
    },
    (error, result) => {
      const { stdout, stderr } = error || result;

      // Something went wrong with executing eslint/prettier
      if (stderr) {
        console.error(stderr);
        return;
      }

      // Extract the list of files
      const files = stdout
        .split('\n')
        .filter(Boolean)
        .map(line => `🛠  ${line}`);

      if (files.length) {
        console.log('\n');
        console.log(`Found ${files.length} file${files.length > 1 ? 's' : ''} that can be fixed:`);
        console.log(files.join('\n'));
        console.log('\n');
      }
    },
  );
};