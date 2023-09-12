/* eslint-disable no-undef */
import genDiff from '../src/index.js';

const filepathJson1 = '__fixtures__/file1.json';
const filepathJson2 = '__fixtures__/file2.json';

test('Result with formatter = stylish', () => {
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

test('Result with formatter = plain', () => {
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

test('Result with formatter = json', () => {
  const expected = '{"key":"root node","children":[{"key":"common","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"remote"},{"key":"setting3","value1":true,"value2":{"key":"value"},"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value1":"too much","value2":"so much","type":"changed"}],"type":"nested"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}],"type":"nested"}],"type":"nested"},{"key":"group1","children":[{"key":"baz","value1":"bas","value2":"bars","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value1":{"key":"value"},"value2":"str","type":"changed"}],"type":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"remote"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"},{"key":"group4","children":[{"key":"default","value1":null,"value2":"","type":"changed"},{"key":"foo","value1":0,"value2":null,"type":"changed"},{"key":"isNested","value1":false,"value2":"none","type":"changed"},{"key":"key","value":false,"type":"added"},{"key":"nest","children":[{"key":"bar","value1":"","value2":0,"type":"changed"},{"key":"isNested","value":true,"type":"remote"}],"type":"nested"},{"key":"someKey","value":true,"type":"added"},{"key":"type","value1":"bas","value2":"bar","type":"changed"}],"type":"nested"},{"key":"language","value":"js","type":"unchanged"}],"type":"nested"}';

  expect(genDiff(filepathJson1, filepathJson2, 'json')).toBe(expected);
});
