/* eslint-disable no-undef */
import genDiff, { genDiffTree, genDiffString } from '../src/index.js';
import readFile from '../src/utils.js';

const filepath1 = './__fixtures__/file1.test.json';
const filepath2 = './__fixtures__/file2.test.json';

const file1 = {
  key5: 'volue5',
  key4: 'volue4',
  key3: 'volue3.1',
  key2: 'volue2',
};
const file2 = {
  key3: 'volue3.2',
  key2: 'volue2',
  key1: 'volue1',
  key0: 'volue0',
};

const tree = {
  key0: { value: 'volue0', symbol: '+' },
  key1: { value: 'volue1', symbol: '+' },
  key2: { value: 'volue2', symbol: ' ' },
  key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
  key4: { value: 'volue4', symbol: '-' },
  key5: { value: 'volue5', symbol: '-' },
};

const tree2 = {
  key0: { value: 'volue0', symbol: '+' },
  key1: { value: 'volue1', symbol: '+' },
  key2: { value: 'volue2', symbol: ' ' },
  key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
  key4: { value: 'volue4', symbol: '-' },
  key5: { value: 'volue5', symbol: '/' },
};

test('test readFile()', () => {
  const expected = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
  };
  expect(readFile(filepath1)).toEqual(expected);
});

test('test genDiff()', () => {
  const expected = '{\n  + key0: volue0\n  + key1: volue1\n    key2: volue2\n  - key3: volue3.1\n  + key3: volue3.2\n  - key4: volue4\n  - key5: volue5\n}';
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('test genDiffTree()', () => {
  const expected = tree;
  expect(genDiffTree(file1, file2)).toEqual(expected);
});

test('test genDiffTree()', () => {
  const expected = '{\n  + key0: volue0\n  + key1: volue1\n    key2: volue2\n  - key3: volue3.1\n  + key3: volue3.2\n  - key4: volue4\n  - key5: volue5\n}';
  expect(genDiffString(tree)).toBe(expected);
});

test('test genDiffTree() throw new Error', () => {
  function diffString() {
    genDiffString(tree2);
  }
  expect(diffString).toThrow('Unknown symbol: /!');
});
