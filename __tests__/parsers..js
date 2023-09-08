/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepathJson1 = getFixturePath('file1.json');
const filepathYaml1 = getFixturePath('file1.yaml');
const filepathYml1 = getFixturePath('file1.yml');
const wrongFilepathCom1 = getFixturePath('file1.com');

const expected = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: 'too much',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
  group4: {
    default: null,
    foo: 0,
    isNested: false,
    nest: {
      bar: '',
      isNested: true,
    },
    type: 'bas',
  },
  language: 'js',
};

test('Result with JSON', () => {
  expect(readFile(filepathJson1)).toEqual(expected);
});

test('Result with YAML', () => {
  expect(readFile(filepathYaml1)).toEqual(expected);

  expect(readFile(filepathYml1)).toEqual(expected);
});

test('Result with throw new Error', () => {
  function getError() {
    readFile(wrongFilepathCom1);
  }
  expect(getError).toThrow('Unknown extName: com!');
});
