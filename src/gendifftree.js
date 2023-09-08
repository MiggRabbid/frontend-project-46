import _ from 'lodash';

const getSortedKey = (file1, file2) => {
  const keysFromFiles = _.uniq(Object.keys(file1).concat(Object.keys(file2)));
  return _.sortBy(keysFromFiles);
};

const genDiffTree = (file1, file2 = {}) => {
  const sortKey = getSortedKey(file1, file2);
  const diffTree = sortKey.reduce((acc, key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      const currentValue = _.cloneDeep(file1[key]);
      return {
        ...acc,
        [key]: { value: currentValue, status: 'remote' },
      };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      const currentValue = _.cloneDeep(file2[key]);
      return {
        ...acc,
        [key]: { value: currentValue, status: 'added' },
      };
    }
    const currentValue1 = _.cloneDeep(file1[key]);
    const currentValue2 = _.cloneDeep(file2[key]);
    if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
      return {
        ...acc,
        [key]: {
          value: genDiffTree(currentValue1, currentValue2),
          status: 'unchanged',
        },
      };
    }
    if (_.isEqual(currentValue1, currentValue2)) {
      return {
        ...acc,
        [key]: { value: currentValue1, status: 'unchanged' },
      };
    }
    return {
      ...acc,
      [key]: { value1: currentValue1, value2: currentValue2, status: 'changed' },
    };
  }, {});

  return diffTree;
};

export default genDiffTree;
