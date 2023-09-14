import _ from 'lodash';

const getComplexOrQuotes = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getString = (path, tree) => {
  const {
    value, value1, value2, type,
  } = tree;
  switch (type) {
    case 'unchanged':
      return '';
    case 'removed':
      return `\nProperty '${path}' was removed`;
    case 'added':
      return `\nProperty '${path}' was added with value: ${getComplexOrQuotes(value)}`;
    case 'changed':
      return `\nProperty '${path}' was updated. From ${getComplexOrQuotes(value1)} to ${getComplexOrQuotes(value2)}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, path = '', currentString = '') => {
    const { key, children, type } = tree;
    const currentPath = (path === '' ? `${key}` : `${path}.${key}`).replace('root node.', '');
    switch (type) {
      case 'root':
        return `${children.map((node) => iter(node, path, currentString)).join('')}`;
      case 'nested':
        return `\n${children.map((node) => iter(node, currentPath, currentString)).join('').replace('\n', '')}`;
      default:
        return getString(currentPath, tree);
    }
  };
  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
