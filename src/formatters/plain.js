// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const getComplexOrQuotes = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  } else if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getString = (currentString, path, symbol, value) => {
  const currentValue = getComplexOrQuotes(value);
  let valueFirst;
  let valueSecond;

  if (symbol === '-+') {
    [valueFirst, valueSecond] = value;
    valueFirst = getComplexOrQuotes(valueFirst);
    valueSecond = getComplexOrQuotes(valueSecond);
  }

  switch (symbol) {
    case null:
      return currentString;
    case '-':
      return `${currentString}\nProperty '${path}' was removed`;
    case '+':
      return `${currentString}\nProperty '${path}' was added with value: ${currentValue}`;
    case '-+':
      return `${currentString}\nProperty '${path}' was updated. From ${valueFirst} to ${valueSecond}`;
    default:
      throw new Error(`\nUnknown symbol: ${symbol}!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, path = '', currentString = '') => {
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      const currentPath = path === '' ? `${key}` : `${path}.${key}`;
      const currentValue = tree[key].value;
      const { symbol } = tree[key];
      if (symbol === '-+') {
        const arrValue = [tree[key].value1, tree[key].value2];
        return getString(acc, currentPath, symbol, arrValue);
      } else if (_.isObject(currentValue)) {
        const tempAcc = iter(tree[key].value, currentPath, acc);
        return getString(tempAcc, currentPath, symbol, currentValue);
      }
      return getString(acc, currentPath, symbol, currentValue);
    }, currentString);
    return result;
  };
  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
