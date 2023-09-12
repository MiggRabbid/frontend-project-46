import yaml from 'js-yaml';

const parser = (extName, data) => {
  switch (extName) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extName: ${extName}!`);
  }
};

export default parser;
