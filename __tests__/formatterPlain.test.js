/* eslint-disable no-undef */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import plain from '../src/formatters/plain.js';

let filepathTree1;
let filepathTree2;
let filepathTree3;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  filepathTree1 = getFixturePath('tree1.json');
  filepathTree2 = getFixturePath('tree2.json');
  filepathTree3 = getFixturePath('tree3.json');
});

test('test formatter Plain', () => {
  const tree1 = JSON.parse(fs.readFileSync(filepathTree1, 'utf-8'));
  const expected1 = `Property 'common.follow' was added with value: false
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
  expect(plain(tree1)).toBe(expected1);

  const tree2 = JSON.parse(fs.readFileSync(filepathTree2, 'utf-8'));
  const expected2 = `Property 'common.follow' was added with value: false
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
Property 'group4.isNested' was updated. From 'none' to false
Property 'group4.key' was added with value: false
Property 'group4.nest.bar' was updated. From '' to 0
Property 'group4.nest.isNested' was removed
Property 'group4.someKey' was added with value: true
Property 'group4.type' was updated. From 'bas' to 'bar'`;

  expect(plain(tree2)).toBe(expected2);
});

test('test formatter plain throw new Error', () => {
  const tree3 = JSON.parse(fs.readFileSync(filepathTree3, 'utf-8'));
  function diffString() {
    plain(tree3);
  }
  expect(diffString).toThrow('Unknown status: wrongStatus!');
});
