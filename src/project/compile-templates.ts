import fs from 'fs';
import { compile } from 'handlebars';
import path from 'path';

import { handlebarFiles } from './handlebar-files';

export const compileTemplates = (options, directoryOptions) => {
  handlebarFiles.forEach(file => {
    const filePath = path.resolve(directoryOptions.targetDirectory, file);
    const source = fs.readFileSync(filePath);
    const fileTemplate = compile(`${source}`);
    const compiledSource = fileTemplate(options);
    fs.writeFileSync(filePath, compiledSource);
  });
};
