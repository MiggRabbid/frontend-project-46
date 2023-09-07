/* eslint-disable no-undef */
import genDiff from '../src/index.js';

const filepathJson1 = '__fixtures__/file1.json';
const filepathJson2 = '__fixtures__/file2.json';

test('test genDiff() formatter = stylish', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
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
    group4: {
      - default: null
      + default: 
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar: 
          + bar: 0
          - isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
    }
    language: js
}`;

  expect(genDiff(filepathJson1, filepathJson2, 'stylish')).toBe(expected);
});

test('test genDiff() formatter = plain', () => {
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'group4.default' was updated. From null to ''
Property 'group4.foo' was updated. From 0 to null
Property 'group4.isNested' was updated. From false to 'none'
Property 'group4.key' was added with value: false
Property 'group4.nest.bar' was updated. From '' to 0
Property 'group4.nest.isNested' was removed
Property 'group4.someKey' was added with value: true
Property 'group4.type' was updated. From 'bas' to 'bar'`;

  expect(genDiff(filepathJson1, filepathJson2, 'plain')).toBe(expected);
});

test('test genDiff() formatter = json', () => {
  const expected = '{"common":{"value":{"follow":{"value":false,"status":"added"},"setting1":{"value":"Value 1","status":"unchanged"},"setting2":{"value":200,"status":"remote"},"setting3":{"value1":true,"value2":{"key":{"value":"value","status":"unchanged"}},"status":"changed"},"setting4":{"value":"blah blah","status":"added"},"setting5":{"value":{"key5":{"value":"value5","status":"unchanged"}},"status":"added"},"setting6":{"value":{"doge":{"value":{"wow":{"value1":"too much","value2":"so much","status":"changed"}},"status":"unchanged"},"key":{"value":"value","status":"unchanged"},"ops":{"value":"vops","status":"added"}},"status":"unchanged"}},"status":"unchanged"},"group1":{"value":{"baz":{"value1":"bas","value2":"bars","status":"changed"},"foo":{"value":"bar","status":"unchanged"},"nest":{"value1":{"key":{"value":"value","status":"unchanged"}},"value2":"str","status":"changed"}},"status":"unchanged"},"group2":{"value":{"abc":{"value":12345,"status":"unchanged"},"deep":{"value":{"id":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"remote"},"group3":{"value":{"deep":{"value":{"id":{"value":{"number":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"unchanged"},"fee":{"value":100500,"status":"unchanged"}},"status":"added"},"group4":{"value":{"default":{"value1":null,"value2":"","status":"changed"},"foo":{"value1":0,"value2":null,"status":"changed"},"isNested":{"value1":false,"value2":"none","status":"changed"},"key":{"value":false,"status":"added"},"nest":{"value":{"bar":{"value1":"","value2":0,"status":"changed"},"isNested":{"value":true,"status":"remote"}},"status":"unchanged"},"someKey":{"value":true,"status":"added"},"type":{"value1":"bas","value2":"bar","status":"changed"}},"status":"unchanged"},"language":{"value":"js","status":"unchanged"}}';

  expect(genDiff(filepathJson1, filepathJson2, 'json')).toBe(expected);
});
