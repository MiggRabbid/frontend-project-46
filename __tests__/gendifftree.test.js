/* eslint-disable no-undef */
import YAML from 'js-yaml';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { getFormattedDiff } from '../src/index.js';
import genDiffTree from '../src/gendifftree.js';

let filepathJson1;
let filepathJson2;
let filepathJson3;
let filepathJson4;
let filepathTree1;
let filepathTree2;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  filepathJson1 = getFixturePath('file3.test.json');
  filepathJson2 = getFixturePath('file4.test.json');
  filepathJson3 = getFixturePath('file5.test.json');
  filepathJson4 = getFixturePath('file6.test.json');
  filepathTree1 = getFixturePath('tree1.yml');
  filepathTree2 = getFixturePath('tree2.yml');
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
    isYaml: { value: true, symbol: null },
    key0: { value: 'volue0', symbol: '+' },
    key1: { value: 'volue1', symbol: '+' },
    key2: { value: 'volue2', symbol: null },
    key3: { value1: 'volue3.1', value2: 'volue3.2', symbol: '-+' },
    key4: { value: 'volue4', symbol: '-' },
    key5: { value: 'volue5', symbol: '-' },
  };
  expect(genDiffTree(fileYaml1, fileYaml2)).toEqual(expected);
});

test('test genDiffTree() for JSON', () => {
  const fileJson1 = JSON.parse(readFileSync(filepathJson1, 'utf-8'));
  const fileJson2 = JSON.parse(readFileSync(filepathJson2, 'utf-8'));
  const expected1 = YAML.load(readFileSync(filepathTree1, 'utf-8'));
  expect(genDiffTree(fileJson1, fileJson2)).toEqual(expected1);

  const fileJson3 = JSON.parse(readFileSync(filepathJson3, 'utf-8'));
  const fileJson4 = JSON.parse(readFileSync(filepathJson4, 'utf-8'));
  const expected2 = YAML.load(readFileSync(filepathTree2, 'utf-8'));
  expect(genDiffTree(fileJson3, fileJson4)).toEqual(expected2);
});

test('test getFormattedDiff() throw new Error', () => {
  const treeJson1 = YAML.load(readFileSync(filepathTree1, 'utf-8'));
  function getDiff() {
    getFormattedDiff(treeJson1, 'undefined');
  }
  expect(getDiff).toThrow('Unknown formatter: undefined!');
});
