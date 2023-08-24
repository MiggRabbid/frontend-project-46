import _ from 'lodash';
import readFile from './parsers.js';

const genDiffTree = (file1, file2) => {
  let keysFromFiles = Object.keys(file1).concat(Object.keys(file2)).sort();
  keysFromFiles = keysFromFiles.filter((key, index) => keysFromFiles.indexOf(key) === index);
  const diffTree = {};
  keysFromFiles.map((key) => {
    if (_.has(file1, key) && _.has(file2, key) && _.isEqual(file1[key], file2[key])) {
      diffTree[key] = { value: file1[key], symbol: ' ' };
    } else if (_.has(file1, key) && _.has(file2, key) && !_.isEqual(file1[key], file2[key])) {
      diffTree[key] = { value1: file1[key], value2: file2[key], symbol: '-+' };
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      diffTree[key] = { value: file1[key], symbol: '-' };
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      diffTree[key] = { value: file2[key], symbol: '+' };
    }
    return diffTree;
  });
  console.log(diffTree);
  return diffTree;
};

const genDiffString = (tree) => {
  const keys = Object.keys(tree);
  const diffString = keys.reduce((acc, key) => {
    const { symbol } = tree[key];
    switch (symbol) {
      case ' ':
        return `${acc}    ${key}: ${tree[key].value}\n`;
      case '-':
        return `${acc}  - ${key}: ${tree[key].value}\n`;
      case '+':
        return `${acc}  + ${key}: ${tree[key].value}\n`;
      case '-+':
        return `${acc}  - ${key}: ${tree[key].value1}\n  + ${key}: ${tree[key].value2}\n`;
      default:
        throw new Error(`Unknown symbol: ${symbol}!`);
    }
  }, '');
  return `{\n${diffString}}`;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  const diffString = genDiffString(diffTree);
  console.log(diffString);
  return diffString;
};

export default genDiff;
export { genDiffTree, genDiffString };
