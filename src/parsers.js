import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parser = (extName, data) => {
  switch (extName) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extName: ${extName}!`);
  }
};

const readFile = (filepath) => {
  const extName = path.extname(filepath).slice(1);
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parser(extName, data);
};

export default readFile;
