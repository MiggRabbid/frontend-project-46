import _ from 'lodash';

const getConcat = (acc, tab, depth, symbol, key, value) => {
  if (symbol === '') {
    return `${acc}${tab.repeat(depth + 1)}${key}: ${value}\n`;
  }
  if (symbol === '-+') {
    const [valueFirst, valueSecond] = value;
    const [minus, plus] = symbol.split('');
    return `${acc}${tab.repeat(depth)}${minus} ${key}: ${valueFirst}\n${tab.repeat(depth)}${plus} ${key}: ${valueSecond}\n`;
  }
  return `${acc}${tab.repeat(depth)}${symbol} ${key}: ${value}\n`;
};

const genDiffString = (diffTree) => {
  const iter = (tree, depth) => {
    const tab = '  ';
    const keys = Object.keys(tree);
    const string = keys.reduce((acc, key) => {
      const { symbol } = tree[key];
      if (_.isObject(tree[key].value)) {
        return getConcat(acc, tab, depth, symbol, key, iter(tree[key].value, depth + 2));
      } else if (_.has(tree[key], 'value1') && _.isObject(tree[key].value1)) {
        const valueFirst = iter(tree[key].value1, depth + 2);
        const valueSecond = tree[key].value2;
        return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
      } else if (_.has(tree[key], 'value2') && _.isObject(tree[key].value2)) {
        const valueFirst = tree[key].value1;
        const valueSecond = iter(tree[key].value2, depth + 2);
        return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
      } else {
        const valueFirst = tree[key].value1;
        const valueSecond = tree[key].value2;
        switch (symbol) {
          case '':
            return getConcat(acc, tab, depth, symbol, key, tree[key].value);
          case '-':
          case '+':
            return getConcat(acc, tab, depth, symbol, key, tree[key].value);
          case '-+':
            return getConcat(acc, tab, depth, symbol, key, [valueFirst, valueSecond]);
          default:
            throw new Error(`Unknown symbol: ${symbol}!`);
        }
      }
    }, '');
    return `{\n${string}${tab.repeat(depth - 1)}}`;
  };

  const diffString = iter(diffTree, 1);
  return diffString;
};

export default genDiffString;
