import _ from 'lodash';

const getStringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const gerCurrentPath = (path, key) => {
  const currentPath = path === '' ? `${key}` : `${path}.${key}`;
  return !currentPath.startsWith('root node') ? currentPath : currentPath.replace('root node.', '');
};

const getString = (tree, path = '') => {
  const {
    key, children, value, value1, value2, type,
  } = tree;
  const currentPath = gerCurrentPath(path, key);
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
      return `\nProperty '${currentPath}' was added with value: ${getStringify(value)}`;
    case 'changed':
      return `\nProperty '${currentPath}' was updated. From ${getStringify(value1)} to ${getStringify(value2)}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

export default (diffTree) => getString(diffTree).replace('\n', '');
