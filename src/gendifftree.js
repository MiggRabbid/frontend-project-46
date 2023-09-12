import _ from 'lodash';

const genDiffTree = (file1, file2) => {
  const keysFromFiles = _.union(Object.keys(file1), Object.keys(file2));
  const sortKey = _.sortBy(keysFromFiles);
  const diffTree = sortKey.flatMap((key) => {
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'remote' };
    }

    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }

    const currentValue1 = file1[key];
    const currentValue2 = file2[key];

    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key,
        children: genDiffTree(currentValue1, currentValue2),
        type: 'nested',
      };
    }

    if (_.isEqual(currentValue1, currentValue2)) {
      return { key, value: currentValue1, type: 'unchanged' };
    }

    return {
      key, value1: currentValue1, value2: currentValue2, type: 'changed',
    };
  }, {});

  return diffTree;
};

export default (file1, file2 = {}) => ({ key: 'root node', children: genDiffTree(file1, file2), type: 'nested' });
