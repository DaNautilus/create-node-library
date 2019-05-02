import { createProject } from '../project';
import { parseArgumentsToOptions } from './arguments/parse-arguments-to-options';
import { promptForMissingOptions } from './options/prompt-for-missing-options';

export const cli = async args => {
  const parsedOptions = parseArgumentsToOptions(args);
  const options = await promptForMissingOptions(parsedOptions);
  await createProject(options);
};
