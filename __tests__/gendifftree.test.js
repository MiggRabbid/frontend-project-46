/* eslint-disable no-undef */

import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getFormattedDiff from '../src/formatters/getFromat';
import genDiffTree from '../src/gendifftree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filepathJson1 = getFixturePath('file1.json');
const filepathJson2 = getFixturePath('file2.json');
const filepathJson3 = getFixturePath('file3.json');
const filepathJson4 = getFixturePath('file4.json');

const filepathYaml1 = getFixturePath('file1.yaml');
const filepathYaml2 = getFixturePath('file2.yaml');

const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');

const filepathTree1 = getFixturePath('tree1.json');
const filepathTree2 = getFixturePath('tree2.json');

const expected1 = JSON.parse(readFileSync(filepathTree1, 'utf-8'));
const expected2 = JSON.parse(readFileSync(filepathTree2, 'utf-8'));

test('Result with JSON', () => {
  const fileJson1 = JSON.parse(readFileSync(filepathJson1, 'utf-8'));
  const fileJson2 = JSON.parse(readFileSync(filepathJson2, 'utf-8'));
  expect(genDiffTree(fileJson1, fileJson2)).toEqual(expected1);

  const fileJson3 = JSON.parse(readFileSync(filepathJson3, 'utf-8'));
  const fileJson4 = JSON.parse(readFileSync(filepathJson4, 'utf-8'));
  expect(genDiffTree(fileJson3, fileJson4)).toEqual(expected2);
});

test('Result with YAML', () => {
  const fileYaml1 = yaml.load(readFileSync(filepathYaml1, 'utf-8'));
  const fileYaml2 = yaml.load(readFileSync(filepathYaml2, 'utf-8'));
  expect(genDiffTree(fileYaml1, fileYaml2)).toEqual(expected1);

  const fileYml1 = yaml.load(readFileSync(filepathYml1, 'utf-8'));
  const fileYml2 = yaml.load(readFileSync(filepathYml2, 'utf-8'));
  expect(genDiffTree(fileYml1, fileYml2)).toEqual(expected1);
});

test('Result with throw new Error', () => {
  const treeJson1 = JSON.parse(readFileSync(filepathTree1, 'utf-8'));
  function getDiff() {
    getFormattedDiff('wrongFormat', treeJson1);
  }
  expect(getDiff).toThrow('Unknown formatter: wrongFormat!');
});
