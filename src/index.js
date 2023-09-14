import { readFileSync } from 'fs';
import path from 'node:path';
import parser from './parsers.js';
import genDiffTree from './gendDiffTree.js';
import getFormattedDiff from './formatters/formatters.js';

const getExtName = (filepath) => path.extname(filepath).slice(1);
const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const extName = getExtName(filepath);
  const fullPath = getFullPath(filepath);
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
