import { readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'js-yaml';

const readFile = (filepath) => {
  const extName = path.extname(filepath);
  switch (extName) {
    case '.json':
      return JSON.parse(readFileSync(filepath, 'utf-8'));
    case '.yaml':
    case '.yml':
      return YAML.load(readFileSync(filepath, 'utf-8'));
    default:
      throw new Error(`Unknown extName: ${extName}!`);
  }
};

export default readFile;