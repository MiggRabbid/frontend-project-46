import _ from 'lodash';
import readFile from './parsers.js';
import stylish from './stylish.js';

const genDiffTree = (file1, file2) => {
  let keysFromFiles = Object.keys(file1).concat(Object.keys(file2)).sort();
  keysFromFiles = keysFromFiles.filter((key, index) => keysFromFiles.indexOf(key) === index);
  const diffTree = {};
  keysFromFiles.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      if (_.isObject(file1[key])) {
        diffTree[key] = {
          value: genDiffTree(file1[key], file1[key]),
          symbol: '-',
        };
      } else {
        diffTree[key] = {
          value: file1[key],
          symbol: '-',
        };
      }
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      if (_.isObject(file2[key])) {
        diffTree[key] = {
          value: genDiffTree(file2[key], file2[key]),
          symbol: '+',
        };
      } else {
        diffTree[key] = {
          value: file2[key],
          symbol: '+',
        };
      }
    } else if (_.has(file1, key) && _.has(file2, key)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        diffTree[key] = {
          value: genDiffTree(file1[key], file2[key]),
          symbol: '',
        };
      } else if (_.isObject(file1[key]) && !_.isObject(file2[key])) {
        diffTree[key] = {
          value1: genDiffTree(file1[key], file1[key]),
          value2: file2[key],
          symbol: '-+',
        };
      } else if (!_.isObject(file1[key]) && _.isObject(file2[key])) {
        diffTree[key] = {
          value1: file1[key],
          value2: genDiffTree(file2[key], file2[key]),
          symbol: '-+',
        };
      } else if (file1[key] === file2[key]) {
        diffTree[key] = {
          value: file1[key],
          symbol: '',
        };
      } else {
        diffTree[key] = {
          value1: file1[key],
          value2: file2[key],
          symbol: '-+',
        };
      }
    }
  });
  return diffTree;
};

const genDiff = (filepath1, filepath2, type) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const diffTree = genDiffTree(file1, file2);
  if (type === 'stylish') {
    return stylish(diffTree);
  }
};

export default genDiff;
export { genDiffTree };
