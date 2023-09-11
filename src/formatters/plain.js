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

const getString = (currentString, path, type, value) => {
  const currentValue = getComplexOrQuotes(value);
  switch (type) {
    case 'unchanged':
      return currentString;
    case 'remote':
      return `${currentString}\nProperty '${path}' was removed`;
    case 'added':
      return `${currentString}\nProperty '${path}' was added with value: ${currentValue}`;
    case 'changed':
      return `${currentString}\nProperty '${path}' was updated. From ${currentValue[0]} to ${currentValue[1]}`;
    default:
      throw new Error(`\nUnknown type: ${type}!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, path = '', currentString = '') => {
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      const currentPath = path === '' ? `${key}` : `${path}.${key}`;
      const { type } = tree[key];

      if (type === 'changed') {
        const arrValue = [tree[key].value1, tree[key].value2];
        return getString(acc, currentPath, type, arrValue);
      }

      const currentValue = tree[key].value;
      if (_.isObject(currentValue)) {
        const tempAcc = iter(tree[key].value, currentPath, acc);
        return getString(tempAcc, currentPath, type, currentValue);
      }

      return getString(acc, currentPath, type, currentValue);
    }, currentString);

    return result;
  };
  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
