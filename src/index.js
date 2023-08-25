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
        symbol: 'spase',
      };
    } else if (_.has(file1, key) && _.has(file2, key) && !_.isEqual(file1[key], file2[key])) {
      deffTree[key] = {
        value1: file1[key],
        value2: file2[key],
        symbol1: 'minus',
        symbol2: 'plus',
      };
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      deffTree[key] = {
        value1: file1[key],
        symbol1: 'minus',
      };
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      deffTree[key] = {
        value2: file2[key],
        symbol2: 'plus',
      };
    }
    return deffTree;
  });

  return deffTree;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const result = genDiffTree(file1, file2);

  return console.log(result);
};

export default genDiff;
