import _ from 'lodash';

const getComplexOrQuotes = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (Array.isArray(value)) {
    return [getComplexOrQuotes(value[0]), getComplexOrQuotes(value[1])];
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getString = (currentString, path, status, value) => {
  const currentValue = getComplexOrQuotes(value);
  switch (status) {
    case 'unchanged':
    case undefined:
      return currentString;
    case 'remote':
      return `${currentString}\nProperty '${path}' was removed`;
    case 'added':
      return `${currentString}\nProperty '${path}' was added with value: ${currentValue}`;
    case 'changed':
      return `${currentString}\nProperty '${path}' was updated. From ${currentValue[0]} to ${currentValue[1]}`;
    default:
      throw new Error(`Unknown status: ${status}!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, path = '', currentString = '') => {
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      const currentPath = path === '' ? `${key}` : `${path}.${key}`;
      const { status } = tree[key];

      if (status === 'changed') {
        const currentValue1 = _.cloneDeep(tree[key].value1);
        const currentValue2 = _.cloneDeep(tree[key].value2);
        return getString(acc, currentPath, status, [currentValue1, currentValue2]);
      }

      const currentValue = _.cloneDeep(tree[key].value);

      if (_.isObject(currentValue) && !_.has(tree[key], 'status')) {
        return getString(acc, currentPath, status, currentValue);
      }

      if (_.isObject(currentValue)) {
        const tempAcc = iter(currentValue, currentPath, acc);
        return getString(tempAcc, currentPath, status, currentValue);
      }
      return getString(acc, currentPath, status, currentValue);
    }, currentString);
    return result;
  };
  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
