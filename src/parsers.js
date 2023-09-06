import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  const extName = path.extname(filepath).slice(1);
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');

  switch (extName) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extName: ${extName}!`);
  }
};

export default readFile;
