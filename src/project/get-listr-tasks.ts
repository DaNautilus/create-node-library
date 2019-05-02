import { projectInstall } from 'pkg-install';

import { copyTemplateFiles } from './copy-template-files';
import { initGit } from './init-git';

export const getListrTasks = (options, directoryOptions) => ([
  {
    title: 'Copy project files',
    task: () => copyTemplateFiles(directoryOptions),
  },
  {
    title: 'Initialize git',
    task: () => initGit(directoryOptions),
    enabled: () => options.git,
  },
  {
    title: 'Install dependencies',
    task: () => projectInstall({ cwd: directoryOptions.targetDirectory }),
    skip: () => !options.runInstall ? 'Pass --install to automatically install dependencies' : undefined,
  },
]);
