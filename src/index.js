import readFile from './parsers.js';
import genDiffTree from './gendifftree.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const getFormattedDiff = (diffTree, formatter, filepath1, filepath2) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree, filepath1, filepath2);
    default:
      throw new Error(`Unknown formatter: ${formatter}!`);
  }
};

const genDiff = (filepath1, filepath2, formatter) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  const diff = getFormattedDiff(diffTree, formatter, filepath1, filepath2);
  return diff;
};

export default genDiff;
export { getFormattedDiff };
