import _ from 'lodash';

const getIndent = (indentAcc, spacesCount = 4) => ' '.repeat(indentAcc * spacesCount - 2);

const getStringify = (value, indentAcc) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const string = keys.map((key) => `${getIndent(indentAcc + 1)}  ${key}: ${getStringify(value[key], indentAcc + 1)}`);
    return `{\n${string.join('\n')}\n  ${getIndent(indentAcc)}}`;
  }
  return value;
};

const getString = (indentAcc, tree) => {
  const {
    key, value, value1, value2, type,
  } = tree;
  switch (type) {
    case 'nested':
    case 'unchanged':
      return `\n${getIndent(indentAcc)}  ${key}: ${getStringify(value, indentAcc)}`;
    case 'removed':
      return `\n${getIndent(indentAcc)}- ${key}: ${getStringify(value, indentAcc)}`;
    case 'added':
      return `\n${getIndent(indentAcc)}+ ${key}: ${getStringify(value, indentAcc)}`;
    case 'changed':
      return `\n${getIndent(indentAcc)}- ${key}: ${getStringify(value1, indentAcc)}\n${getIndent(indentAcc)}+ ${key}: ${getStringify(value2, indentAcc)}`;
    default:
      throw new Error(`Unknown type: ${type}!`);
  }
};

const stylish = (diffTree) => {
  const iter = (tree, indentAcc = 1) => {
    const { key, children, type } = tree;
    switch (type) {
      case 'root':
        return `{${children.map((node) => iter(node, indentAcc)).join('')}\n}`;
      case 'nested':
        return getString(indentAcc, {
          key,
          value: `{${children.map((node) => iter(node, indentAcc + 1)).join('')}\n  ${getIndent(indentAcc)}}`,
          type,
        });
      default:
        return getString(indentAcc, tree);
    }
  };
  const diffString = iter(diffTree);
  return diffString;
};

export default stylish;
