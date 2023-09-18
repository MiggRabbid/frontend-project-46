import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const getError = (expectedFormatter) => {
  throw new Error(`Unknown formatter: ${expectedFormatter}!`);
};

const getFormattedDiff = (formatter, diffTree) => {
  const formatters = {
    stylish: (expectedDiffTree) => stylish(expectedDiffTree),
    plain: (expectedDiffTree) => plain(expectedDiffTree),
    json: (expectedDiffTree) => JSON.stringify(expectedDiffTree),
  };
  return _.has(formatters, formatter) ? formatters[formatter](diffTree) : getError(formatter);
};

export default getFormattedDiff;
