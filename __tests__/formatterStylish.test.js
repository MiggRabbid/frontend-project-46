/* eslint-disable no-undef */
import YAML from 'js-yaml';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import stylish from '../src/formatters/stylish.js';

let filepathTree1;
let filepathTree2;
let filepathTree3;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  filepathTree1 = getFixturePath('tree1.yml');
  filepathTree2 = getFixturePath('tree2.yml');
  filepathTree3 = getFixturePath('tree3.yml');
});

test('test formatter Stylish', () => {
  const tree1 = YAML.load(readFileSync(filepathTree1, 'utf-8'));
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
  expect(stylish(tree1)).toBe(expected1);

  const tree2 = YAML.load(readFileSync(filepathTree2, 'utf-8'));
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
  expect(stylish(tree2)).toBe(expected2);
});

test('test formatter Stylish throw new Error', () => {
  const tree3 = YAML.load(readFileSync(filepathTree3, 'utf-8'));
  function diffString() {
    stylish(tree3);
  }
  expect(diffString).toThrow('Unknown status: unadded!');
});
