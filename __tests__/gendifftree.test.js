/* eslint-disable no-undef */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { getFormattedDiff } from '../src/index.js';
import genDiffTree from '../src/gendifftree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepathJson1 = getFixturePath('file3.test.json');
const filepathJson2 = getFixturePath('file4.test.json');
const filepathJson3 = getFixturePath('file5.test.json');
const filepathJson4 = getFixturePath('file6.test.json');

const treeJson1 = {
  common: {
    value: {
      follow: {
        value: false,
        status: 'added',
      },
      setting1: {
        value: 'Value 1',
        status: 'unchanged',
      },
      setting2: {
        value: 200,
        status: 'remote',
      },
      setting3: {
        value1: true,
        value2: null,
        status: 'changed',
      },
      setting4: {
        value: 'blah blah',
        status: 'added',
      },
      setting5: {
        value: {
          key5: {
            value: 'value5',
            status: 'unchanged',
          },
        },
        status: 'added',
      },
      setting6: {
        value: {
          doge: {
            value: {
              wow: {
                value1: '',
                value2: 'so much',
                status: 'changed',
              },
            },
            status: 'unchanged',
          },
          key: {
            value: 'value',
            status: 'unchanged',
          },
          ops: {
            value: 'vops',
            status: 'added',
          },
        },
        status: 'unchanged',
      },
    },
    status: 'unchanged',
  },
  group1: {
    value: {
      baz: {
        value1: 'bas',
        value2: 'bars',
        status: 'changed',
      },
      foo: {
        value: 'bar',
        status: 'unchanged',
      },
      nest: {
        value1: {
          key: {
            value: 'value',
            status: 'unchanged',
          },
        },
        value2: 'str',
        status: 'changed',
      },
    },
    status: 'unchanged',
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        status: 'unchanged',
      },
      deep: {
        value: {
          id: {
            value: 45,
            status: 'unchanged',
          },
        },
        status: 'unchanged',
      },
    },
    status: 'remote',
  },
  group3: {
    value: {
      deep: {
        value: {
          id: {
            value: {
              number: {
                value: 45,
                status: 'unchanged',
              },
            },
            status: 'unchanged',
          },
        },
        status: 'unchanged',
      },
      fee: {
        value: 100500,
        status: 'unchanged',
      },
    },
    status: 'added',
  },
};
const treeJson2 = {
  common: {
    value: {
      follow: {
        value: false,
        status: 'added',
      },
      setting1: {
        value: 'Value 1',
        status: 'unchanged',
      },
      setting2: {
        value: 200,
        status: 'remote',
      },
      setting3: {
        value1: true,
        value2: null,
        status: 'changed',
      },
      setting4: {
        value: 'blah blah',
        status: 'added',
      },
      setting5: {
        value: {
          key5: {
            value: 'value5',
            status: 'unchanged',
          },
        },
        status: 'added',
      },
      setting6: {
        value: {
          doge: {
            value: {
              wow: {
                value1: '',
                value2: 'so much',
                status: 'changed',
              },
            },
            status: 'unchanged',
          },
          key: {
            value: 'value',
            status: 'unchanged',
          },
          ops: {
            value: 'vops',
            status: 'added',
          },
        },
        status: 'unchanged',
      },
    },
    status: 'unchanged',
  },
  group1: {
    value: {
      baz: {
        value1: 'bas',
        value2: 'bars',
        status: 'changed',
      },
      foo: {
        value: 'bar',
        status: 'unchanged',
      },
      nest: {
        value1: 'str',
        value2: {
          key: {
            value: 'value',
            status: 'unchanged',
          },
        },
        status: 'changed',
      },
    },
    status: 'unchanged',
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        status: 'unchanged',
      },
      deep: {
        value: {
          id: {
            value: 45,
            status: 'unchanged',
          },
        },
        status: 'unchanged',
      },
    },
    status: 'remote',
  },
  group3: {
    value: {
      deep: {
        value: {
          id: {
            value: {
              number: {
                value: 45,
                status: 'unchanged',
              },
            },
            status: 'unchanged',
          },
        },
        status: 'unchanged',
      },
      fee: {
        value: 100500,
        status: 'unchanged',
      },
    },
    status: 'added',
  },
};

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
    isYaml: { value: true, status: 'unchanged' },
    key0: { value: 'volue0', status: 'added' },
    key1: { value: 'volue1', status: 'added' },
    key2: { value: 'volue2', status: 'unchanged' },
    key3: { value1: 'volue3.1', value2: 'volue3.2', status: 'changed' },
    key4: { value: 'volue4', status: 'remote' },
    key5: { value: 'volue5', status: 'remote' },
  };
  expect(genDiffTree(fileYaml1, fileYaml2)).toEqual(expected);
});

test('test genDiffTree() for JSON', () => {
  const fileJson1 = JSON.parse(readFileSync(filepathJson1, 'utf-8'));
  const fileJson2 = JSON.parse(readFileSync(filepathJson2, 'utf-8'));
  const expected1 = treeJson1;
  expect(genDiffTree(fileJson1, fileJson2)).toEqual(expected1);

  const fileJson3 = JSON.parse(readFileSync(filepathJson3, 'utf-8'));
  const fileJson4 = JSON.parse(readFileSync(filepathJson4, 'utf-8'));
  const expected2 = treeJson2;
  expect(genDiffTree(fileJson3, fileJson4)).toEqual(expected2);
});

test('test getFormattedDiff() throw new Error', () => {
  function getDiff() {
    getFormattedDiff(treeJson1, 'undefined');
  }
  expect(getDiff).toThrow('Unknown formatter: undefined!');
});
