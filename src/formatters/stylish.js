import _ from 'lodash';

const getConcat = (acc, tab, depth, symbol, key, value) => {
  let valueFirst;
  let valueSecond;
  let minus;
  let plus;

  switch (symbol) {
    case null:
      return `${acc}${tab.repeat(depth + 1)}${key}: ${value}\n`;
    case '-':
    case '+':
      return `${acc}${tab.repeat(depth)}${symbol} ${key}: ${value}\n`;
    case '-+':
      [valueFirst, valueSecond] = value;
      [minus, plus] = symbol.split('');
      return `${acc}${tab.repeat(depth)}${minus} ${key}: ${valueFirst}\n${tab.repeat(depth)}${plus} ${key}: ${valueSecond}\n`;
    default:
      throw new Error(`Unknown symbol: ${symbol}!`);
  }
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const tab = '  ';
    const keys = Object.keys(tree);
    const string = keys.reduce((acc, key) => {
      const { symbol } = tree[key];
      if (_.isObject(tree[key].value)) {
        const currentValue = iter(tree[key].value, depth + 2);
        return getConcat(acc, tab, depth, symbol, key, currentValue);
      }
      if (_.has(tree[key], 'value1') && _.isObject(tree[key].value1)) {
        const valueFirst = iter(tree[key].value1, depth + 2);
        const valueSecond = tree[key].value2;
        return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
      }
      if (_.has(tree[key], 'value2') && _.isObject(tree[key].value2)) {
        const valueFirst = tree[key].value1;
        const valueSecond = iter(tree[key].value2, depth + 2);
        return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
      }
      if (symbol === '-+') {
        const valueFirst = tree[key].value1;
        const valueSecond = tree[key].value2;
        return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
      } else {
        const currentValue = tree[key].value;
        return getConcat(acc, tab, depth, symbol, key, currentValue);
      }
    }, '');
    return `{\n${string}${tab.repeat(depth - 1)}}`;
  };
  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
