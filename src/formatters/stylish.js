import _ from 'lodash';

const getIndent = (tabCounter) => ''.repeat(tabCounter + 2);

const getString = (tabCounter, type, key, value) => {
  switch (type) {
    case undefined:
    case 'nested':
    case 'unchanged':
      return `${getIndent(tabCounter)}  ${key}: ${value}\n`;
    case 'remote':
      return `${getIndent(tabCounter)}- ${key}: ${value}\n`;
    case 'added':
      return `${getIndent(tabCounter)}+ ${key}: ${value}\n`;
    case 'changed':
      return `${getIndent(tabCounter)}- ${key}: ${value[0]}\n${getIndent(tabCounter)}+ ${key}: ${value[1]}\n`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const stylish = (diffTree) => {
  const iter = (tree, tabCounter) => {
    console.log('tree.key - ', tree.key);
    if (tree.key === 'root node') {
      const { children } = tree;
      const result = children.map((node) => iter(node, tabCounter + 2));
      return `{\n${result}${' '.repeat(tabCounter - 1)}}`;
    }

    if (tree.type === 'nested') {
      const { children } = tree;
      const result = children.map((node) => iter(node, tabCounter + 2));
      return result;
    }

    if (tree.type === 'changed') {
      const result = getString(tabCounter, tree.type, tree.key, [tree.value1, tree.value1]);
      return result;
    }

    const result = getString(tabCounter, tree.type, tree.key, tree.value);
    return result;
  };
  const diffString = iter(diffTree, 1);
  return diffString;
};

export default stylish;
