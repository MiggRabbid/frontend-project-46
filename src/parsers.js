import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  const extName = path.extname(filepath);
  const fullPath = path.resolve(process.cwd(), filepath);

  switch (extName) {
    case '.json':
      return JSON.parse(readFileSync(fullPath, 'utf-8'));
    case '.yaml':
    case '.yml':
      return yaml.load(readFileSync(fullPath, 'utf-8'));
    default:
      throw new Error(`Unknown extName: ${extName}!`);
  }
};

export default readFile;
