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
  expect(readFile(filepathYaml1)).toEqual(expected1);

  const expected2 = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
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
  expect(getError).toThrow('Unknown extName: com!');
});
