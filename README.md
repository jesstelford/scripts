## Installation

```
yarn add @jesstelford/scripts
```

Add the following to `package.json`:

```json
{
  "config": {
    "source": "<<GLOB>>"
  },
  "lint-staged": {
    "<<GLOB>>": [
      "jesstelford-scripts lint list"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "scripts": {
    "version": "jesstelford-scripts version",
    "lint": "jesstelford-scripts lint",
    "lint:fix": "jesstelford-scripts lint fix"
  }
}
```

## Usage

```
$ jesstelford-scripts --help

  Usage
    $ jesstelford-scripts <command> [options]
  Available Commands
    lint         Display any lint errors or warnings.
    lint fix     Fix lint errors and format source code.
    lint list    List file(s) that have linting or formatting errors.
    version      Verify, update and commit CHANGELOG.md
  For more info, run any command with the `--help` flag
    $ jesstelford-scripts lint --help
    $ jesstelford-scripts lint fix --help
  Options
    -v, --version    Displays current version
    -h, --help       Displays this message
```

### `lint`

```
$ jesstelford-scripts lint --help

  Description
    Display any lint errors or warnings.
    If no file specified, will lint all source files as defined in package.json config.jesstelford-scripts.source.
    file can be a single file, or a glob pattern.
  Usage
    $ jesstelford-scripts lint [file] [options]
  Options
    -h, --help    Displays this message
  Examples
    $ jesstelford-scripts lint                   # lint files defined in config.source
    $ jesstelford-scripts lint src/index.js      # lint a single file
    $ jesstelford-scripts lint {src,lib}/**/*.js # lint all .js files in src/ and lib/
```

### `lint fix`

```
$ jesstelford-scripts lint fix --help

  Description
    Fix lint errors and format source code.
    If no file specified, will fix and format all source files as defined in package.json config.source.
    file can be a single file, or a glob pattern.
  Usage
    $ jesstelford-scripts lint fix [file] [options]
  Options
    -h, --help    Displays this message
  Examples
    $ jesstelford-scripts lint fix                   # fix and format files defined in config.source
    $ jesstelford-scripts lint fix src/index.js      # fix and format a single file
    $ jesstelford-scripts lint fix {src,lib}/**/*.js # fix and format all .js files in src/ and lib/
```

### `lint list`

```
$ jesstelford-scripts lint list --help

  Description
    List file(s) that have linting or formatting errors.
    If no file specified, will execute on all source files as defined in package.json config.source.
    Particularly useful when combined with `lint-staged` and `husky`
    file can be a single file, or a glob pattern.
  Usage
    $ jesstelford-scripts lint list [file] [options]
  Options
    -h, --help    Displays this message
  Examples
    $ jesstelford-scripts lint list                   # execute on files defined in config.source
    $ jesstelford-scripts lint list src/index.js      # execute on a single file
    $ jesstelford-scripts lint list {src,lib}/**/*.js # execute on all .js files in src/ and lib/
```

### `version`

```
$ jesstelford-scripts version --help

  Description
    Verify, update and commit CHANGELOG.md
    Runs: `version-changelog CHANGELOG.md && changelog-verify CHANGELOG.md && git add CHANGELOG.md`
  Usage
    $ jesstelford-scripts version [options]
  Options
    -h, --help    Displays this message
```
