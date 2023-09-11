import _ from 'lodash';

const getString = (acc, tab, tabCounter, type, key, value) => {
  switch (type) {
    case 'unchanged':
      return `${acc}${tab.repeat(tabCounter + 1)}${key}: ${value}\n`;
    case 'remote':
      return `${acc}${tab.repeat(tabCounter)}- ${key}: ${value}\n`;
    case 'added':
      return `${acc}${tab.repeat(tabCounter)}+ ${key}: ${value}\n`;
    case 'changed':
      return `${acc}${tab.repeat(tabCounter)}- ${key}: ${value[0]}\n${tab.repeat(tabCounter)}+ ${key}: ${value[1]}\n`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const stylish = (diffTree) => {
  const iter = (tree, tabCounter) => {
    const tab = '  ';
    const keys = Object.keys(tree);
    const string = keys.reduce((acc, key) => {
      const { type } = tree[key];
      if (type === 'changed') {
        if (_.isObject(tree[key].value1)) {
          const valueFirst = iter(tree[key].value1, tabCounter + 2);
          const valueSecond = tree[key].value2;
          return getString(acc, tab, tabCounter, type, key, [valueFirst, valueSecond]);
        }
        if (_.isObject(tree[key].value2)) {
          const valueFirst = tree[key].value1;
          const valueSecond = iter(tree[key].value2, tabCounter + 2);
          return getString(acc, tab, tabCounter, type, key, [valueFirst, valueSecond]);
        }
        const valueFirst = tree[key].value1;
        const valueSecond = tree[key].value2;
        return getString(acc, tab, tabCounter, type, key, [valueFirst, valueSecond]);
      }
      if (_.isObject(tree[key].value)) {
        const currentValue = iter(tree[key].value, tabCounter + 2);
        return getString(acc, tab, tabCounter, type, key, currentValue);
      }
      const currentValue = tree[key].value;
      return getString(acc, tab, tabCounter, type, key, currentValue);
    }, '');
    return `{\n${string}${tab.repeat(tabCounter - 1)}}`;
  };
  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
