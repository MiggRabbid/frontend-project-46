/* eslint-disable no-undef */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff, { genDiffTree } from '../src/index.js';
import readFile from '../src/parsers.js';
import genDiffString from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepathYaml1 = getFixturePath('file1.test.yml');
const filepathYaml2 = getFixturePath('file2.test.yaml');
const filepathJson1 = getFixturePath('file3.test.json');
const filepathJson2 = getFixturePath('file4.test.json');
const filepathJson3 = getFixturePath('file5.test.json');
const filepathJson4 = getFixturePath('file6.test.json');

test('test readFile() for YAML', () => {
  const expected1 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isYaml: true,
  };
  expect(readFile(filepathYaml1)).toEqual(expected1);

  const expected2 = {
    key3: 'volue3.2',
    key2: 'volue2',
    key1: 'volue1',
    key0: 'volue0',
    isYaml: true,
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

test('test genDiff()', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff(filepathJson1, filepathJson2)).toBe(expected);
});

test('test readFile() for YAML', () => {
  const expected1 = {
    key5: 'volue5',
    key4: 'volue4',
    key3: 'volue3.1',
    key2: 'volue2',
    isYaml: true,
  };
  expect(readFile(filepathYaml1)).toEqual(expected1);
  const expected2 = {
    key3: 'volue3.2',
    key2: 'volue2',
    key1: 'volue1',
    key0: 'volue0',
    isYaml: true,
  };
  expect(readFile(filepathYaml2)).toEqual(expected2);
});

test('test readFile() for JSON', () => {
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
  expect(readFile(filepathJson1)).toEqual(expected1);
});

test('test readFile() throw new Error', () => {
  const wrongFilepathYaml2 = './__fixtures__/file2.test.com';
  function getError() {
    readFile(wrongFilepathYaml2);
  }
  expect(getError).toThrow('Unknown extName: .com!');
});

const treeJson1 = {
  common: {
    value: {
      follow: {
        value: false,
        symbol: '+',
      },
      setting1: {
        value: 'Value 1',
        symbol: '',
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
            symbol: '',
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
            symbol: '',
          },
          key: {
            value: 'value',
            symbol: '',
          },
          ops: {
            value: 'vops',
            symbol: '+',
          },
        },
        symbol: '',
      },
    },
    symbol: '',
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
        symbol: '',
      },
      nest: {
        value1: {
          key: {
            value: 'value',
            symbol: '',
          },
        },
        value2: 'str',
        symbol: '-+',
      },
    },
    symbol: '',
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        symbol: '',
      },
      deep: {
        value: {
          id: {
            value: 45,
            symbol: '',
          },
        },
        symbol: '',
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
                symbol: '',
              },
            },
            symbol: '',
          },
        },
        symbol: '',
      },
      fee: {
        value: 100500,
        symbol: '',
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
        symbol: '',
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
            symbol: '',
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
            symbol: '',
          },
          key: {
            value: 'value',
            symbol: '',
          },
          ops: {
            value: 'vops',
            symbol: '+',
          },
        },
        symbol: '',
      },
    },
    symbol: '',
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
        symbol: '',
      },
      nest: {
        value1: 'str',
        value2: {
          key: {
            value: 'value',
            symbol: '',
          },
        },
        symbol: '-+',
      },
    },
    symbol: '',
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        symbol: '',
      },
      deep: {
        value: {
          id: {
            value: 45,
            symbol: '',
          },
        },
        symbol: '',
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
                symbol: '',
              },
            },
            symbol: '',
          },
        },
        symbol: '',
      },
      fee: {
        value: 100500,
        symbol: '',
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
    isYaml: { value: true, symbol: '' },
    key0: { value: 'volue0', symbol: '+' },
    key1: { value: 'volue1', symbol: '+' },
    key2: { value: 'volue2', symbol: '' },
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

test('test genDiffString()', () => {
  const expected1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiffString(treeJson1)).toBe(expected1);
  const expected2 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: str
      + nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiffString(treeJson2)).toBe(expected2);
});

const treeJson3 = {
  common: {
    value: {
      follow: {
        value: false,
        symbol: '+',
      },
      setting1: {
        value: 'Value 1',
        symbol: '',
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
            symbol: '',
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
            symbol: '',
          },
          key: {
            value: 'value',
            symbol: '',
          },
          ops: {
            value: 'vops',
            symbol: '+',
          },
        },
        symbol: '',
      },
    },
    symbol: '',
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
        symbol: '',
      },
      nest: {
        value1: {
          key: {
            value: 'value',
            symbol: '',
          },
        },
        value2: 'str',
        symbol: '-+',
      },
    },
    symbol: '',
  },
  group2: {
    value: {
      abc: {
        value: 12345,
        symbol: '',
      },
      deep: {
        value: {
          id: {
            value: 45,
            symbol: '',
          },
        },
        symbol: '',
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
                symbol: '',
              },
            },
            symbol: '',
          },
        },
        symbol: '',
      },
      fee: {
        value: 100500,
        symbol: '/',
      },
    },
    symbol: '+',
  },
};

test('test genDiffString() throw new Error', () => {
  function diffString() {
    genDiffString(treeJson3);
  }
  expect(diffString).toThrow('Unknown symbol: /!');
});
