import yaml from 'js-yaml';
import _ from 'lodash';

const getError = (expectedExtName) => {
  throw new Error(`Unknown extName: ${expectedExtName}!`);
};

const parser = (extName, data) => {
  const formats = {
    json: (expectedData) => JSON.parse(expectedData),
    yaml: (expectedData) => yaml.load(expectedData),
    yml: (expectedData) => yaml.load(expectedData),
  };
  return _.has(formats, extName) ? formats[extName](data) : getError(extName);
};

export default parser;
