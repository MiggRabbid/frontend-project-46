/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import readFile from '../src/parsers.js';

let filepathYaml1;
let filepathYaml2;
let filepathJson1;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  filepathYaml1 = getFixturePath('file1.test.yml');
  filepathYaml2 = getFixturePath('file2.test.yaml');
  filepathJson1 = getFixturePath('file3.test.json');
});

test('test readFile() for YAML', () => {
  const expected1 = {
    key5: 'value5',
    key4: 'value4',
    key3: 'value3.1',
    key2: {
      key22: 'value2',
    },
    withChildren: {
      children1: '----',
    },
    isYaml: true,
  };
  expect(readFile(filepathYaml1)).toEqual(expected1);

  const expected2 = {
    key3: 'value3.2',
    key2: {
      key22: 'value2',
    },
    key1: 'value1',
    key0: 'value0',
    isYaml: true,
    withChildren: {
      children1: {
        children2: '+++',
      },
    },
  };
  expect(readFile(filepathYaml2)).toEqual(expected2);
});

test('test readFile() for JSON', () => {
  const expected = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
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
  };
  expect(readFile(filepathJson1)).toEqual(expected);
});

test('test readFile() throw new Error', () => {
  const wrongFilepathYaml2 = './__fixtures__/file2.test.com';
  function getError() {
    readFile(wrongFilepathYaml2);
  }
  expect(getError).toThrow('Unknown extName: .com!');
});
