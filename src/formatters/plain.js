import _ from 'lodash';

const getComplexOrQuotes = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    return [getComplexOrQuotes(value[0]), getComplexOrQuotes(value[1])];
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

const getString = (path, type, value) => {
  const currentValue = getComplexOrQuotes(value);
  switch (type) {
    case 'unchanged':
      return '';
    case 'remote':
      return `\nProperty '${path}' was removed`;
    case 'added':
      return `\nProperty '${path}' was added with value: ${currentValue}`;
    case 'changed':
      return `\nProperty '${path}' was updated. From ${currentValue[0]} to ${currentValue[1]}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const plain = (diffTree) => {
  const iter = (tree, path = '', currentString = '') => {
    const { key, type } = tree;

    if (key === 'root node') {
      const { children } = tree;
      const result = children.map((node) => iter(node, path, currentString)).join('');
      return `${result}`;
    }

    const currentPath = path === '' ? `${key}` : `${path}.${key}`;

    if (type === 'nested') {
      const { children } = tree;
      const result = children.map((node) => iter(node, currentPath, currentString)).join('');
      return `\n${result.replace('\n', '')}`;
    }

    if (type === 'changed') {
      return getString(currentPath, type, [tree.value1, tree.value2]);
    }

    return getString(currentPath, type, tree.value);
  };
  const diffString = iter(diffTree).replace('\n', '');
  return diffString;
};

export default plain;
