import _ from 'lodash';

const getString = (acc, tab, tabCounter, status, key, value) => {
  switch (status) {
    case undefined:
    case 'unchanged':
      return `${acc}${tab.repeat(tabCounter + 1)}${key}: ${value}\n`;
    case 'remote':
      return `${acc}${tab.repeat(tabCounter)}- ${key}: ${value}\n`;
    case 'added':
      return `${acc}${tab.repeat(tabCounter)}+ ${key}: ${value}\n`;
    case 'changed':
      return `${acc}${tab.repeat(tabCounter)}- ${key}: ${value[0]}
${tab.repeat(tabCounter)}+ ${key}: ${value[1]}\n`;
    default:
      throw new Error(`Unknown status: ${status}!`);
  }
};

const getStrWithoutStat = (tab, tabCounter, key, value) => `${tab.repeat(tabCounter + 1)}${key}: ${value}\n`;
const stylish = (diffTree) => {
  const iter = (tree, tabCounter) => {
    const tab = '  ';
    const keys = Object.keys(tree);
    const string = keys.reduce((acc, key) => {
      console.log('===================================');
      console.log('keys  -', keys);
      console.log('-----------------------------------');
      console.log('key       -', key);
      console.log('-----------------------------------');
      console.log('tree[key] -', tree[key]);
      console.log('===================================');
      const { status } = tree[key];

      if (status === 'changed') {
        const tempValue1 = _.cloneDeep(tree[key].value1);
        const tempValue2 = _.cloneDeep(tree[key].value2);
        const valueFirst = _.isObject(tempValue1) ? iter(tempValue1, tabCounter + 2) : tempValue1;
        const valueSecond = _.isObject(tempValue2) ? iter(tempValue2, tabCounter + 2) : tempValue2;
        return getString(acc, tab, tabCounter, status, key, [valueFirst, valueSecond]);
      }

      if (!_.has(tree[key], 'status')) {
        const tempValue = _.cloneDeep(tree[key]);
        const currentValue = _.isObject(tempValue) ? iter(tempValue, tabCounter + 2) : tempValue;
        // console.log('\n\n');
        // console.log('keys  -', keys);
        // console.log('tree  -', tree);
        // console.log('key   -', key);
        // console.log('status -', status);
        // console.log('value -', tempValue);
        // console.log('\n\n');
        return getStrWithoutStat(tab, tabCounter, key, currentValue);
      }

      const tempValue = _.cloneDeep(tree[key].value);
      const currentValue = _.isObject(tempValue) ? iter(tempValue, tabCounter + 2) : tempValue;
      return getString(acc, tab, tabCounter, status, key, currentValue);
    }, '');
    return `{\n${string}${tab.repeat(tabCounter - 1)}}`;
  };
  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
