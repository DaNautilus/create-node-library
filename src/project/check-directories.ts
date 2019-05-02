import chalk from 'chalk';
import fs from 'fs';
import { promisify } from 'util';

const access = promisify(fs.access);

export const checkDirectories = async directoryOptions => {
  try {
    await access(directoryOptions.templateDirectory, fs.constants.F_OK);
  } catch (error) {
    fs.mkdirSync(directoryOptions.templateDirectory);
  }

  try {
    await access(directoryOptions.templateDirectory, fs.constants.R_OK);
  } catch (error) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }
};
