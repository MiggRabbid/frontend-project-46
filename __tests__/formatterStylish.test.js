/* eslint-disable no-undef */
import stylish from '../src/formatters/stylish.js';

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
