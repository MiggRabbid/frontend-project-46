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
        symbol: '+',
      },
      setting1: {
        value: 'Value 1',
        symbol: null,
      },
      setting2: {
        value: 200,
        symbol: '-',
      },
      setting3: {
        value1: true,
        value2: null,
        symbol: '-+',
      },
      setting4: {
        value: 'blah blah',
        symbol: '+',
      },
      setting5: {
        value: {
          key5: {
            value: 'value5',
            symbol: null,
          },
        },
        symbol: '+',
      },
      setting6: {
        value: {
          doge: {
            value: {
              wow: {
                value1: '',
                value2: 'so much',
                symbol: '-+',
              },
            },
            symbol: null,
          },
          key: {
            value: 'value',
            symbol: null,
          },
          ops: {
            value: 'vops',
            symbol: '+',
          },
        },
        symbol: null,
      },
    },
    symbol: null,
  },
  group1: {
    value: {
      baz: {
        value1: 'bas',
        value2: 'bars',
        symbol: '-+',
      },
      foo: {
        value: 'bar',
        symbol: null,
      },
      nest: {
        value1: {
          key: {
            value: 'value',
            symbol: null,
          },
        },
        value2: 'str',
        symbol: '-+',
      },
    },
    symbol: null,
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        symbol: null,
      },
      deep: {
        value: {
          id: {
            value: 45,
            symbol: null,
          },
        },
        symbol: null,
      },
    },
    symbol: '-',
  },
  group3: {
    value: {
      deep: {
        value: {
          id: {
            value: {
              number: {
                value: 45,
                symbol: null,
              },
            },
            symbol: null,
          },
        },
        symbol: null,
      },
      fee: {
        value: 100500,
        symbol: null,
      },
    },
    symbol: '+',
  },
};
const treeJson2 = {
  common: {
    value: {
      follow: {
        value: false,
        symbol: '+',
      },
      setting1: {
        value: 'Value 1',
        symbol: null,
      },
      setting2: {
        value: 200,
        symbol: '-',
      },
      setting3: {
        value1: true,
        value2: null,
        symbol: '-+',
      },
      setting4: {
        value: 'blah blah',
        symbol: '+',
      },
      setting5: {
        value: {
          key5: {
            value: 'value5',
            symbol: null,
          },
        },
        symbol: '+',
      },
      setting6: {
        value: {
          doge: {
            value: {
              wow: {
                value1: '',
                value2: 'so much',
                symbol: '-+',
              },
            },
            symbol: null,
          },
          key: {
            value: 'value',
            symbol: null,
          },
          ops: {
            value: 'vops',
            symbol: '+',
          },
        },
        symbol: null,
      },
    },
    symbol: null,
  },
  group1: {
    value: {
      baz: {
        value1: 'bas',
        value2: 'bars',
        symbol: '-+',
      },
      foo: {
        value: 'bar',
        symbol: null,
      },
      nest: {
        value1: 'str',
        value2: {
          key: {
            value: 'value',
            symbol: null,
          },
        },
        symbol: '-+',
      },
    },
    symbol: null,
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        symbol: null,
      },
      deep: {
        value: {
          id: {
            value: 45,
            symbol: null,
          },
        },
        symbol: null,
      },
    },
    symbol: '-',
  },
  group3: {
    value: {
      deep: {
        value: {
          id: {
            value: {
              number: {
                value: 45,
                symbol: null,
              },
            },
            symbol: null,
          },
        },
        symbol: null,
      },
      fee: {
        value: 100500,
        symbol: null,
      },
    },
    symbol: '+',
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
