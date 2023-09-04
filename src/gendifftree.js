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
          status: 'unchanged',
        };
      } else {
        diffTree[key] = {
          value: _.isObject(file1[key]) ? genDiffTree(file1[key]) : file1[key],
          status: 'remote',
        };
      }
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      diffTree[key] = {
        value: _.isObject(file2[key]) ? genDiffTree(file2[key]) : file2[key],
        status: 'added',
      };
    } else if (_.has(file1, key) && _.has(file2, key)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        diffTree[key] = {
          value: genDiffTree(file1[key], file2[key]),
          status: 'unchanged',
        };
      } else if (file1[key] === file2[key]) {
        diffTree[key] = {
          value: file1[key],
          status: 'unchanged',
        };
      } else {
        diffTree[key] = {
          value1: _.isObject(file1[key]) ? genDiffTree(file1[key]) : file1[key],
          value2: _.isObject(file2[key]) ? genDiffTree(file2[key]) : file2[key],
          status: 'changed',
        };
      }
    }
  });

  return diffTree;
};

export default genDiffTree;
