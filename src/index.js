import _ from 'lodash';
import readFile from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const keysFromFile1 = Object.keys(file1).sort();
  const keysFromFile2 = Object.keys(file2).sort();

  let result = '{';

  keysFromFile1.map((key) => {
    if (keysFromFile2.includes(key) && _.isEqual(file1[key], file2[key])) {
      result = `${result}\n    ${key}: ${file1[key]}`;
    } else if (keysFromFile2.includes(key) && !_.isEqual(file1[key], file2[key])) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
      result = `${result}\n  + ${key}: ${file2[key]}`;
    } else if (!keysFromFile2.includes(key)) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
    }
    return result;
  });

  keysFromFile2.map((key) => {
    if (!keysFromFile1.includes(key)) {
      result = `${result}\n  + ${key}: ${file2[key]}`;
    }
    return result;
  });

  return console.log(`${result}\n}`);
};

export default genDiff;
