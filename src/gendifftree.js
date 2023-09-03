import _ from 'lodash';

const genDiffTree = (file1, file2 = {}) => {
  let keysFromFiles = Object.keys(file1).concat(Object.keys(file2)).sort();
  keysFromFiles = keysFromFiles.filter((key, index) => keysFromFiles.indexOf(key) === index);
  const diffTree = {};
  keysFromFiles.forEach((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      if (Object.keys(file2).length === 0) {
        diffTree[key] = {
          value: _.isObject(file1[key]) ? genDiffTree(file1[key]) : file1[key],
          symbol: null,
        };
      } else {
        diffTree[key] = {
          value: _.isObject(file1[key]) ? genDiffTree(file1[key]) : file1[key],
          symbol: '-',
        };
      }
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      diffTree[key] = {
        value: _.isObject(file2[key]) ? genDiffTree(file2[key]) : file2[key],
        symbol: '+',
      };
    } else if (_.has(file1, key) && _.has(file2, key)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        diffTree[key] = {
          value: genDiffTree(file1[key], file2[key]),
          symbol: null,
        };
      } else if (file1[key] === file2[key]) {
        diffTree[key] = {
          value: file1[key],
          symbol: null,
        };
      } else {
        diffTree[key] = {
          value1: _.isObject(file1[key]) ? genDiffTree(file1[key]) : file1[key],
          value2: _.isObject(file2[key]) ? genDiffTree(file2[key]) : file2[key],
          symbol: '-+',
        };
      }
    }
  });

  return diffTree;
};

export default genDiffTree;
