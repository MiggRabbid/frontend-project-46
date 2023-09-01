// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const getConcat = (currentString, path, symbol, value) => {
  let currentValue = value;
  let valueFirst;
  let valueSecond;
  if (typeof value === 'string' && value !== '[complex value]') {
    currentValue = `'${value}'`;
  }

  if (symbol === '-+') {
    [valueFirst, valueSecond] = value;
    if (typeof valueFirst === 'string' && valueFirst !== '[complex value]') {
      valueFirst = `'${valueFirst}'`;
    }
    if (typeof valueSecond === 'string' && valueSecond !== '[complex value]') {
      valueSecond = `'${valueSecond}'`;
    }
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
      let temp;
      let currentPath;
      const currentValue = tree[key].value;
      const { symbol } = tree[key];

      if (path === '') {
        currentPath = `${key}`;
      } else {
        currentPath = `${path}.${key}`;
      }

      if (symbol === '+') {
        if (_.isObject(currentValue)) {
          temp = getConcat(acc, currentPath, symbol, '[complex value]');
        } else {
          temp = getConcat(acc, currentPath, symbol, currentValue);
        }
        return temp;
      }
      if (symbol === null) {
        if (_.isObject(currentValue)) {
          const tempAcc = iter(tree[key].value, currentPath, acc);
          temp = getConcat(tempAcc, currentPath, symbol, currentValue);
        } else {
          temp = getConcat(acc, currentPath, symbol, currentValue);
        }
        return temp;
      }
      if (symbol === '-+') {
        if (_.isObject(tree[key].value1)) {
          const arrValue = ['[complex value]', tree[key].value2];
          temp = getConcat(acc, currentPath, symbol, arrValue);
        } else if (_.isObject(tree[key].value2)) {
          const arrValue = [tree[key].value1, '[complex value]'];
          temp = getConcat(acc, currentPath, symbol, arrValue);
        } else {
          const arrValue = [tree[key].value1, tree[key].value2];
          temp = getConcat(acc, currentPath, symbol, arrValue);
        }
        return temp;
      }
      return getConcat(acc, currentPath, symbol, currentValue);
    }, currentString);

    return result;
  };

  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
