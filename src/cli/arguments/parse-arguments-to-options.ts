import arg from 'arg';

import { argumentsSpecification } from './arguments-specification';
import { mapArgumentsToOptions } from './map-arguments-to-options';

export const parseArgumentsToOptions = args => {
  const parsedArguments = arg(argumentsSpecification, { argv: args.slice(2) });

  return mapArgumentsToOptions(parsedArguments);
};
