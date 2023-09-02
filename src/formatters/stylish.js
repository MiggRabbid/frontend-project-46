import _ from 'lodash';

const getString = (acc, tab, tabCounter, symbol, key, value) => {
  let valueFirst;
  let valueSecond;
  let minus;
  let plus;
  switch (symbol) {
    case null:
      return `${acc}${tab.repeat(tabCounter + 1)}${key}: ${value}\n`;
    case '-':
    case '+':
      return `${acc}${tab.repeat(tabCounter)}${symbol} ${key}: ${value}\n`;
    case '-+':
      [valueFirst, valueSecond] = value;
      [minus, plus] = symbol.split('');
      return `${acc}${tab.repeat(tabCounter)}${minus} ${key}: ${valueFirst}\n${tab.repeat(tabCounter)}${plus} ${key}: ${valueSecond}\n`;
    default:
      throw new Error(`Unknown symbol: ${symbol}!`);
  }
};

const stylish = (diffTree) => {
  const iter = (tree, tabCounter) => {
    const tab = '  ';
    const keys = Object.keys(tree);
    const string = keys.reduce((acc, key) => {
      const { symbol } = tree[key];
      if (_.isObject(tree[key].value)) {
        const currentValue = iter(tree[key].value, tabCounter + 2);
        return getString(acc, tab, tabCounter, symbol, key, currentValue);
      } else if (_.isObject(tree[key].value1)) {
        const valueFirst = iter(tree[key].value1, tabCounter + 2);
        const valueSecond = tree[key].value2;
        return getString(acc, tab, tabCounter, symbol, key, [valueFirst, valueSecond]);
      } else if (_.isObject(tree[key].value2)) {
        const valueFirst = tree[key].value1;
        const valueSecond = iter(tree[key].value2, tabCounter + 2);
        return getString(acc, tab, tabCounter, symbol, key, [valueFirst, valueSecond]);
      } else if (symbol === '-+') {
        const valueFirst = tree[key].value1;
        const valueSecond = tree[key].value2;
        return getString(acc, tab, tabCounter, symbol, key, [valueFirst, valueSecond]);
      }
      const currentValue = tree[key].value;
      return getString(acc, tab, tabCounter, symbol, key, currentValue);
    }, '');
    return `{\n${string}${tab.repeat(tabCounter - 1)}}`;
  };
  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
