import _ from 'lodash';

const getIndent = (indentAcc) => ' '.repeat(indentAcc);

const getStringify = (value, indentAcc) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const string = keys.map((key) => `${getIndent(indentAcc + 4)}  ${key}: ${getStringify(value[key], indentAcc + 4)}`);
    return `{\n${string.join('\n')}\n${getIndent(indentAcc + 2)}}`;
  }

  return value;
};

const getString = (indentAcc, type, key, value) => {
  switch (type) {
    case 'nested':
    case 'unchanged':
      return `\n${getIndent(indentAcc)}  ${key}: ${getStringify(value, indentAcc)}`;
    case 'remote':
      return `\n${getIndent(indentAcc)}- ${key}: ${getStringify(value, indentAcc)}`;
    case 'added':
      return `\n${getIndent(indentAcc)}+ ${key}: ${getStringify(value, indentAcc)}`;
    case 'changed':
      return `${getString(indentAcc, 'remote', key, value[0])}${getString(indentAcc, 'added', key, value[1])}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const getStrWithoutStat = (tab, tabCounter, key, value) => `${tab.repeat(tabCounter + 1)}${key}: ${value}\n`;
const stylish = (diffTree) => {
  const iter = (tree, indentAcc) => {
    const { key, type } = tree;

    if (key === 'root node') {
      const { children } = tree;
      const result = children.map((node) => iter(node, indentAcc + 1)).join('');
      return `{${result}\n}`;
    }

    if (type === 'nested') {
      const { children } = tree;
      const value = `{${children.map((node) => iter(node, indentAcc + 4)).join('')}\n${getIndent(indentAcc + 2)}}`;
      return getString(indentAcc, type, key, value);
    }

    if (type === 'changed') {
      return getString(indentAcc, type, key, [tree.value1, tree.value2]);
    }

    return getString(indentAcc, type, key, tree.value);
  };

  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
