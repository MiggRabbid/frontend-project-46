import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedDiff = (diffTree, formatter, filepath1, filepath2) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree, filepath1, filepath2);
    default:
      throw new Error(`Unknown formatter: ${formatter}!`);
  }
};

export default getFormattedDiff;
