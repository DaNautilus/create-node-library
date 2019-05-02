import { options } from './options';

export const getInquirerQuestions = (providedOptions) => {
  return options
    .filter(({ name }) => !providedOptions[name])
    .map(({ type, name, message, choices, defaultValue }) => ({
      type,
      name,
      message,
      choices,
      default: defaultValue,
    }));
};
