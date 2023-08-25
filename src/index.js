import _ from 'lodash';
import readFile from './utils.js';

const genDiffTree = (file1, file2) => {
  let keysFromFiles = Object.keys(file1)
    .concat(Object.keys(file2))
    .sort();
  keysFromFiles = keysFromFiles.filter((key, index) => keysFromFiles.indexOf(key) === index);

  const deffTree = {};

  keysFromFiles.map((key) => {
    if (_.has(file1, key) && _.has(file2, key) && _.isEqual(file1[key], file2[key])) {
      deffTree[key] = {
        value: file1[key],
        symbol: ' ',
      };
    } else if (_.has(file1, key) && _.has(file2, key) && !_.isEqual(file1[key], file2[key])) {
      deffTree[key] = {
        value1: file1[key],
        value2: file2[key],
        symbol: '-+',
      };
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      deffTree[key] = {
        value: file1[key],
        symbol: '-',
      };
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      deffTree[key] = {
        value: file2[key],
        symbol: '+',
      };
    }
    return deffTree;
  });

  return deffTree;
};

const genDiffString = (tree) => {
  const keys = Object.keys(tree);

  const deffString = keys.reduce((acc, key) => {
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

  return `{\n${deffString}}`;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const deffTree = genDiffTree(file1, file2);
  const deffString = genDiffString(deffTree);

  console.log(deffString);
  return deffString;
};

export default genDiff;
export { genDiffTree, genDiffString };
