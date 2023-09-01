/* eslint-disable no-undef */
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

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

const treeJson3 = {
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
    symbol: '/',
  },
};

test('test formatter Stylish', () => {
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
  expect(stylish(treeJson1)).toBe(expected1);
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
  expect(stylish(treeJson2)).toBe(expected2);
});

test('test formatter Stylish throw new Error', () => {
  function diffString() {
    stylish(treeJson3);
  }
  expect(diffString).toThrow('Unknown symbol: /!');
});

test('test formatter Plain', () => {
  const expected1 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(plain(treeJson1)).toBe(expected1);

  const expected2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From 'str' to [complex value]
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(plain(treeJson2)).toBe(expected2);
});

test('test formatter plain throw new Error', () => {
  function diffString() {
    plain(treeJson3);
  }
  expect(diffString).toThrow('Unknown symbol: /!');
});
