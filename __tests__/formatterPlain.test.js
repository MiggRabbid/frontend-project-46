/* eslint-disable no-undef */
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
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
  filepathTree1 = getFixturePath('tree1.yml');
  filepathTree2 = getFixturePath('tree2.yml');
  filepathTree3 = getFixturePath('tree3.yml');
});

test('test formatter Plain', () => {
  const tree1 = yaml.load(readFileSync(filepathTree1, 'utf-8'));
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

  expect(plain(tree1)).toBe(expected1);

  const tree2 = yaml.load(readFileSync(filepathTree2, 'utf-8'));
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

  expect(plain(tree2)).toBe(expected2);
});

test('test formatter plain throw new Error', () => {
  const tree3 = yaml.load(readFileSync(filepathTree3, 'utf-8'));
  function diffString() {
    plain(tree3);
  }
  expect(diffString).toThrow('Unknown status: unadded!');
});
