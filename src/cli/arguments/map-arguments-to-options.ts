export const mapArgumentsToOptions = args => ({
  skipPrompts: args['--yes'] || false,
  git: args['--git'] || false,
  runInstall: args['--install'] || false,
  projectName: args._[0],
  template: args._[1],
});
