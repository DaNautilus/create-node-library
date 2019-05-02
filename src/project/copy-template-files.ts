import ncp from 'ncp';
import { promisify } from 'util';

const copy = promisify(ncp);

export const copyTemplateFiles = async options => copy(options.templateDirectory, options.targetDirectory, { clobber: false });
