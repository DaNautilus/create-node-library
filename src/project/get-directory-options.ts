import path from 'path';

export const getDirectoryOptions = options => {
  const templateDirectory = path.resolve(__dirname, '../templates', options.template.toLowerCase());

  const targetPath = options.targetDirectory || process.cwd();
  const targetDirectory = path.resolve(targetPath, options.projectName);

  return { templateDirectory, targetDirectory };
};
