import _ from 'lodash';

const genDiffTree = (file1, file2 = {}) => {
  const keysFromFiles = _.uniq(Object.keys(file1).concat(Object.keys(file2)));
  const sortKey = _.sortBy(keysFromFiles);
  const diffTree = sortKey.reduce((acc, key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      const currentValue = _.cloneDeep(file1[key]);
      const temp = _.isObject(currentValue) ? genDiffTree(currentValue) : currentValue;
      if (Object.keys(file2).length === 0) {
        return {
          ...acc,
          [key]: { value: temp, type: 'unchanged' },
        };
      }
      return {
        ...acc,
        [key]: { value: temp, type: 'remote' },
      };
    }

    if (!_.has(file1, key) && _.has(file2, key)) {
      const currentValue = _.cloneDeep(file2[key]);
      const temp = _.isObject(currentValue) ? genDiffTree(currentValue) : currentValue;
      return {
        ...acc,
        [key]: { value: temp, type: 'added' },
      };
    }

    const currentValue1 = _.cloneDeep(file1[key]);
    const currentValue2 = _.cloneDeep(file2[key]);
    if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
      return {
        ...acc,
        [key]: {
          value: genDiffTree(currentValue1, currentValue2),
          type: 'unchanged',
        },
      };
    }

    if (currentValue1 === currentValue2) {
      return {
        ...acc,
        [key]: { value: currentValue1, type: 'unchanged' },
      };
    }

    const temp1 = _.isObject(currentValue1) ? genDiffTree(currentValue1) : currentValue1;
    const temp2 = _.isObject(currentValue2) ? genDiffTree(currentValue2) : currentValue2;
    return {
      ...acc,
      [key]: { value1: temp1, value2: temp2, type: 'changed' },
    };
  }, {});

  return diffTree;
};

export default genDiffTree;
