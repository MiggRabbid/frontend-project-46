import _ from 'lodash';

const genDiffTree = (file1, file2 = {}) => {
  const keysFromFiles = _.uniq(Object.keys(file1).concat(Object.keys(file2)));
  const sortKey = _.sortBy(keysFromFiles);
  const diffTree = sortKey.reduce((acc, key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      const currentValue = _.cloneDeep(file1[key]);
      if (Object.keys(file2).length === 0) {
        return {
          ...acc,
          [key]: {
            value: _.isObject(currentValue) ? genDiffTree(currentValue) : _.cloneDeep(currentValue),
            status: 'unchanged',
          },
        };
      }
      return {
        ...acc,
        [key]: {
          value: _.isObject(currentValue) ? genDiffTree(currentValue) : _.cloneDeep(currentValue),
          status: 'remote',
        },
      };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      const currentValue = _.cloneDeep(file2[key]);
      return {
        ...acc,
        [key]: {
          value: _.isObject(currentValue) ? genDiffTree(currentValue) : _.cloneDeep(currentValue),
          status: 'added',
        },
      };
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      const tempValue1 = _.cloneDeep(file1[key]);
      const tempValue2 = _.cloneDeep(file2[key]);
      if (_.isObject(tempValue1) && _.isObject(tempValue2)) {
        return {
          ...acc,
          [key]: {
            value: genDiffTree(tempValue1, tempValue2),
            status: 'unchanged',
          },
        };
      } if (tempValue1 === tempValue2) {
        return {
          ...acc,
          [key]: {
            value: tempValue1,
            status: 'unchanged',
          },
        };
      }
      return {
        ...acc,
        [key]: {
          value1: _.isObject(tempValue1) ? genDiffTree(tempValue1) : _.cloneDeep(tempValue1),
          value2: _.isObject(tempValue2) ? genDiffTree(tempValue2) : _.cloneDeep(tempValue2),
          status: 'changed',
        },
      };
    }
  }, {});

  return diffTree;
};

export default genDiffTree;
