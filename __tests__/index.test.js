/* eslint-disable no-undef */
import genDiff from '../src/index.js';

const filepathJson1 = '__fixtures__/file3.test.json';
const filepathJson2 = '__fixtures__/file4.test.json';

test('test genDiff() formatter = stylish', () => {
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

  expect(genDiff(filepathJson1, filepathJson2, 'stylish')).toBe(expected);
});

test('test genDiff() formatter = plain', () => {
  const expected = `Property 'common.follow' was added with value: false
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

  expect(genDiff(filepathJson1, filepathJson2, 'plain')).toBe(expected);
});

test('test genDiff() formatter = json', () => {
  const expected = '{"common":{"value":{"follow":{"value":false,"status":"added"},"setting1":{"value":"Value 1","status":"unchanged"},"setting2":{"value":200,"status":"remote"},"setting3":{"value1":true,"value2":null,"status":"changed"},"setting4":{"value":"blah blah","status":"added"},"setting5":{"value":{"key5":{"value":"value5","status":"unchanged"}},"status":"added"},"setting6":{"value":{"doge":{"value":{"wow":{"value1":"","value2":"so much","status":"changed"}},"status":"unchanged"},"key":{"value":"value","status":"unchanged"},"ops":{"value":"vops","status":"added"}},"status":"unchanged"}},"status":"unchanged"},"group1":{"value":{"baz":{"value1":"bas","value2":"bars","status":"changed"},"foo":{"value":"bar","status":"unchanged"},"nest":{"value1":{"key":{"value":"value","status":"unchanged"}},"value2":"str","status":"changed"}},"status":"unchanged"},"group2":{"value":{"abc":{"value":12345,"status":"unchanged"},"deep":{"value":{"id":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"remote"},"group3":{"value":{"deep":{"value":{"id":{"value":{"number":{"value":45,"status":"unchanged"}},"status":"unchanged"}},"status":"unchanged"},"fee":{"value":100500,"status":"unchanged"}},"status":"added"}}';

  expect(genDiff(filepathJson1, filepathJson2, 'json')).toBe(expected);
});
