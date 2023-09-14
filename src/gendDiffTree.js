import _ from 'lodash';

const genDiffTree = (file1, file2) => {
  const keysFromFiles = _.union(Object.keys(file1), Object.keys(file2));
  const sortKey = _.sortBy(keysFromFiles);
  const diffTree = sortKey.map((key) => {
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'removed' };
    }
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return {
        key,
        children: genDiffTree(file1[key], file2[key]),
        type: 'nested',
      };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, value: file1[key], type: 'unchanged' };
    }
    return {
      key, value1: file1[key], value2: file2[key], type: 'changed',
    };
  });
  return diffTree;
};

export default (file1, file2 = {}) => ({ key: 'root node', children: genDiffTree(file1, file2), type: 'root' });
