export const options = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Please name your new project',
    defaultValue: 'node-library',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe your project',
    defaultValue: 'node library',
  },
  {
    type: 'list',
    name: 'template',
    message: 'Please choose which template you want to use',
    choices: ['TypeScript'],
    defaultValue: 'TypeScript',
  },
];
