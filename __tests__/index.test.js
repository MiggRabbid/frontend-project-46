/* eslint-disable no-undef */
import genDiff, { genDiffTree, genDiffString } from '../src/index.js';
import readFile from '../src/parsers.js';

const filepathJson1 = './__fixtures__/file1.test.json';
const filepathJson2 = './__fixtures__/file2.test.json';
const filepathYaml1 = './__fixtures__/file1.test.yml';
const filepathYaml2 = './__fixtures__/file2.test.yaml';

test('test genDiff()', () => {
  const expected = '{\n    isJSON: true\n  + key0: volue0\n  + key1: volue1\n    key2: volue2\n  - key3: volue3.1\n  + key3: volue3.2\n  - key4: volue4\n  - key5: volue5\n}';
  expect(genDiff(filepathJson1, filepathJson2)).toBe(expected);
});

test('test readFile() JSON and YAML', () => {
  const expected1 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isJSON: true,
  };
  expect(readFile(filepathJson1)).toEqual(expected1);
  const expected2 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isYaml: true,
  };
  expect(readFile(filepathYaml1)).toEqual(expected2);
  const expected3 = {
    key3: 'volue3.2',
    key2: 'volue2',
    key1: 'volue1',
    key0: 'volue0',
    isYaml: true,
  };
  expect(readFile(filepathYaml2)).toEqual(expected3);
});

test('test readFile() throw new Error', () => {
  const wrongFilepathYaml2 = './__fixtures__/file2.test.com';
  function getError() {
    readFile(wrongFilepathYaml2);
  }
  expect(getError).toThrow('Unknown extName: .com!');
});

const treeJson1 = {
  isJSON: { value: true, symbol: ' ' },
  key0: { value: 'volue0', symbol: '+' },
  key1: { value: 'volue1', symbol: '+' },
  key2: { value: 'volue2', symbol: ' ' },
  key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
  key4: { value: 'volue4', symbol: '-' },
  key5: { value: 'volue5', symbol: '-' },
};
const treeJson2 = {
  isJSON: { value: true, symbol: ' ' },
  key0: { value: 'volue0', symbol: '+' },
  key1: { value: 'volue1', symbol: '+' },
  key2: { value: 'volue2', symbol: ' ' },
  key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
  key4: { value: 'volue4', symbol: '-' },
  key5: { value: 'volue5', symbol: '/' },
};

test('test genDiffTree() for JSON', () => {
  const fileJson1 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isJSON: true,
  };
  const fileJson2 = {
    key3: 'volue3.2',
    key2: 'volue2',
    key1: 'volue1',
    key0: 'volue0',
    isJSON: true,
  };
  const expected = treeJson1;
  expect(genDiffTree(fileJson1, fileJson2)).toEqual(expected);
});

test('test genDiffTree() for YAML', () => {
  const fileYaml1 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isYaml: true,
  };
  const fileYaml2 = {
    key3: 'volue3.2',
    key2: 'volue2',
    key1: 'volue1',
    key0: 'volue0',
    isYaml: true,
  };
  const expected = {
    isYaml: { value: true, symbol: ' ' },
    key0: { value: 'volue0', symbol: '+' },
    key1: { value: 'volue1', symbol: '+' },
    key2: { value: 'volue2', symbol: ' ' },
    key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
    key4: { value: 'volue4', symbol: '-' },
    key5: { value: 'volue5', symbol: '-' },
  };
  expect(genDiffTree(fileYaml1, fileYaml2)).toEqual(expected);
});

test('test genDiffString()', () => {
  const expected = '{\n    isJSON: true\n  + key0: volue0\n  + key1: volue1\n    key2: volue2\n  - key3: volue3.1\n  + key3: volue3.2\n  - key4: volue4\n  - key5: volue5\n}';
  expect(genDiffString(treeJson1)).toBe(expected);
});

test('test genDiffString() throw new Error', () => {
  function diffString() {
    genDiffString(treeJson2);
  }
  expect(diffString).toThrow('Unknown symbol: /!');
});
