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
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: {
      key22: 'volue2',
    },
    withChildren: {
      children1: '----',
    },
    isYaml: true,
  };
  expect(readFile(filepathYaml1)).toEqual(expected1);

  const expected2 = {
    key3: 'volue3.2',
    key2: {
      key22: 'volue2',
    },
    key1: 'volue1',
    key0: 'volue0',
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
