import { options } from './options';

export const getDefaultOptions = () => {
  const defaultOptions = {};
  options.forEach(option => defaultOptions[option.name] = option.defaultValue);

  return defaultOptions;
};
