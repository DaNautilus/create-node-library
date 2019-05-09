import inquirer from 'inquirer';

import { mergeDeep } from '../../helpers/merge-deep';
import { getDefaultOptions } from './get-default-options';
import { getInquirerQuestions } from './get-inquirer-questions';

export const promptForMissingOptions = async providedOptions => {
  if (providedOptions.skipPrompts) {
    return mergeDeep({}, providedOptions, getDefaultOptions());
  }

  const questions = getInquirerQuestions(providedOptions);
  const answers = await inquirer.prompt(questions);

  return mergeDeep({}, providedOptions, answers);
};
