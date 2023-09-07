import { readFileSync } from 'fs';
import path from 'node:path';
import YAML from 'yaml';

const parser = (extName, data) => {
  switch (extName) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return YAML.parse(data);
    case 'yml':
      return YAML.parse(data);
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
