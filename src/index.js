import { readFileSync } from 'fs';
import path from 'node:path';
import parser from './parsers.js';
import genDiffTree from './gendifftree.js';
import getFormattedDiff from './formatters/getFromat.js';

const readFile = (filepath) => {
  const extName = path.extname(filepath).slice(1);
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parser(extName, data);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  const diff = getFormattedDiff(formatter, diffTree);
  return diff;
};

export default genDiff;
export { readFile };
