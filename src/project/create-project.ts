import chalk from 'chalk';
import Listr from 'listr';

import { checkDirectories } from './check-directories';
import { getDirectoryOptions } from './get-directory-options';
import { getListrTasks } from './get-listr-tasks';

export const createProject = async options => {
  const directoryOptions = getDirectoryOptions(options);
  await checkDirectories(directoryOptions);

  const tasks = getListrTasks(options, directoryOptions);
  const listr = new Listr(tasks);

  await listr.run();

  console.log('% Your project is ready, have fun!', chalk.green.bold('DONE'));

  return true;
};
