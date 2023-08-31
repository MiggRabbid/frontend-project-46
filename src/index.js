import readFile from './parsers.js';
import genDiffTree from './gendifftree.js';
import stylish from './formatters/stylish.js';
// import plain from './formatters/plain.js';

const getFormattedDiff = (diffTree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(diffTree);
    // case 'plain':
    //   return plain(diffTree);
    default:
      throw new Error(`Unknown formatter: ${type}!`);
  }
};

const genDiff = (filepath1, filepath2, type) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  const diff = getFormattedDiff(diffTree, type);
  return diff;
};

export default genDiff;
export { getFormattedDiff };
