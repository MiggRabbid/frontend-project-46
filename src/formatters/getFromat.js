import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedDiff = (diffTree, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`Unknown formatter: ${formatter}!`);
  }
};

export default getFormattedDiff;
