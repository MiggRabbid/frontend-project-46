import _ from 'lodash';

const genDiffTree = (file1, file2 = {}) => {
  let keysFromFiles = Object.keys(file1).concat(Object.keys(file2)).sort();
  keysFromFiles = keysFromFiles.filter((key, index) => keysFromFiles.indexOf(key) === index);

  const diffTree = {};

  keysFromFiles.forEach((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      if (_.isObject(file1[key]) && Object.keys(file2).length === 0) {
        diffTree[key] = {
          value: genDiffTree(file1[key]),
          symbol: null,
        };
      } else if (_.isObject(file1[key])) {
        diffTree[key] = {
          value: genDiffTree(file1[key]),
          symbol: '-',
        };
      } else if (Object.keys(file2).length === 0) {
        diffTree[key] = {
          value: file1[key],
          symbol: null,
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
          value: genDiffTree(file2[key]),
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
          symbol: null,
        };
      } else if (_.isObject(file1[key]) && !_.isObject(file2[key])) {
        diffTree[key] = {
          value1: genDiffTree(file1[key]),
          value2: file2[key],
          symbol: '-+',
        };
      } else if (!_.isObject(file1[key]) && _.isObject(file2[key])) {
        diffTree[key] = {
          value1: file1[key],
          value2: genDiffTree(file2[key]),
          symbol: '-+',
        };
      } else if (file1[key] === file2[key]) {
        diffTree[key] = {
          value: file1[key],
          symbol: null,
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

export default genDiffTree;
