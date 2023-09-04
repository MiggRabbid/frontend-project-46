import readFile from './parsers.js';
import genDiffTree from './gendifftree.js';
import getFormattedDiff from './formatters/getFromat.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  const diff = getFormattedDiff(diffTree, formatter, filepath1, filepath2);
  return diff;
};

export default genDiff;
