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

const getString = (tree, path = '') => {
  const {
    key, children, value, value1, value2, type,
  } = tree;
  const currentPath = (path === '' ? `${key}` : `${path}.${key}`).replace('root node.', '');
  switch (type) {
    case 'root':
      return `${children.map((node) => getString(node, currentPath)).join('')}`;
    case 'nested':
      return `\n${children.map((node) => getString(node, currentPath)).join('').replace('\n', '')}`;
    case 'unchanged':
      return '';
    case 'removed':
      return `\nProperty '${currentPath}' was removed`;
    case 'added':
      return `\nProperty '${currentPath}' was added with value: ${getComplexOrQuotes(value)}`;
    case 'changed':
      return `\nProperty '${currentPath}' was updated. From ${getComplexOrQuotes(value1)} to ${getComplexOrQuotes(value2)}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default (diffTree) => getString(diffTree).replace('\n', '');
