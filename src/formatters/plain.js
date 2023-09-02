// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const getString = (currentString, path, symbol, value) => {
  let currentValue = value;
  let valueFirst;
  let valueSecond;
  if (_.isString(value)) {
    currentValue = `'${value}'`;
  } else if (_.isObject(value)) {
    currentValue = '[complex value]';
  }

  if (symbol === '-+') {
    [valueFirst, valueSecond] = value;
    if (_.isString(valueFirst)) {
      valueFirst = `'${valueFirst}'`;
    } else if (_.isObject(valueFirst)) {
      valueFirst = '[complex value]';
    }
    if (_.isString(valueSecond)) {
      valueSecond = `'${valueSecond}'`;
    } else if (_.isObject(valueSecond)) {
      valueSecond = '[complex value]';
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

      if (symbol === null) {
        if (_.isObject(currentValue)) {
          const tempAcc = iter(tree[key].value, currentPath, acc);
          temp = getString(tempAcc, currentPath, symbol, currentValue);
        } else {
          temp = getString(acc, currentPath, symbol, currentValue);
        }
        return temp;
      }
      if (symbol === '-+') {
        const arrValue = [tree[key].value1, tree[key].value2];
        if (_.isObject(tree[key].value1)) {
          temp = getString(acc, currentPath, symbol, arrValue);
        } else if (_.isObject(tree[key].value2)) {
          temp = getString(acc, currentPath, symbol, arrValue);
        } else {
          temp = getString(acc, currentPath, symbol, arrValue);
        }
        return temp;
      }
      return getString(acc, currentPath, symbol, currentValue);
    }, currentString);

    return result;
  };

  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
