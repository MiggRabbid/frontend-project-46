/* eslint-disable no-undef */
import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getFormattedDiff from '../src/formatters/getFromat.js';
import genDiffTree from '../src/gendifftree.js';

let filepathJson1;
let filepathJson2;
let filepathJson3;
let filepathJson4;
let filepathYaml1;
let filepathYaml2;
let filepathYml1;
let filepathYml2;
let filepathTree1;
let filepathTree2;
let expected1;
let expected2;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  filepathJson1 = getFixturePath('file1.json');
  filepathJson2 = getFixturePath('file2.json');
  filepathJson3 = getFixturePath('file3.json');
  filepathJson4 = getFixturePath('file4.json');

  filepathYaml1 = getFixturePath('file1.yaml');
  filepathYaml2 = getFixturePath('file2.yaml');

  filepathYml1 = getFixturePath('file1.yml');
  filepathYml2 = getFixturePath('file2.yml');

  filepathTree1 = getFixturePath('tree1.json');
  filepathTree2 = getFixturePath('tree2.json');

  expected1 = JSON.parse(fs.readFileSync(filepathTree1, 'utf-8'));
  expected2 = JSON.parse(fs.readFileSync(filepathTree2, 'utf-8'));
});

test('test genDiffTree() for JSON', () => {
  const fileJson1 = JSON.parse(fs.readFileSync(filepathJson1, 'utf-8'));
  const fileJson2 = JSON.parse(fs.readFileSync(filepathJson2, 'utf-8'));
  expect(genDiffTree(fileJson1, fileJson2)).toEqual(expected1);

  const fileJson3 = JSON.parse(fs.readFileSync(filepathJson3, 'utf-8'));
  const fileJson4 = JSON.parse(fs.readFileSync(filepathJson4, 'utf-8'));
  expect(genDiffTree(fileJson3, fileJson4)).toEqual(expected2);
});

test('test genDiffTree() for YAML', () => {
  const fileYaml1 = yaml.load(fs.readFileSync(filepathYaml1, 'utf-8'));
  const fileYaml2 = yaml.load(fs.readFileSync(filepathYaml2, 'utf-8'));
  expect(genDiffTree(fileYaml1, fileYaml2)).toEqual(expected1);

  const fileYml1 = yaml.load(fs.readFileSync(filepathYml1, 'utf-8'));
  const fileYml2 = yaml.load(fs.readFileSync(filepathYml2, 'utf-8'));
  expect(genDiffTree(fileYml1, fileYml2)).toEqual(expected1);
});

test('test getFormattedDiff() throw new Error', () => {
  const treeJson1 = JSON.parse(fs.readFileSync(filepathTree1, 'utf-8'));
  function getDiff() {
    getFormattedDiff('wrongFormat', treeJson1);
  }
  expect(getDiff).toThrow('Unknown formatter: wrongFormat!');
});
