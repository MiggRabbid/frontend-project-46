/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import getFormatteDiff from '../src/formatters/formatters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', expected: 'expectedStylish1.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'plain', expected: 'expectedPlain1.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', expected: 'expectedJson1.txt',
  },
])('Normal start ($file1, $file2), with formatter - $format', ({
  file1, file2, format, expected,
}) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  const expectedPath = getFixturePath(expected);
  expect(genDiff(filePath1, filePath2, format)).toBe(readFileSync(expectedPath, 'utf-8'));
});

test.each([
  {
    file1: 'file1.com', file2: 'file2.com', format: 'stylish', error: 'Unknown extName: com!',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'wrongFormatter', error: 'Unknown formatter: wrongFormatter!',
  },
])('Start with error for ($file1, $file2), error - $error', ({
  file1, file2, format, error,
}) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  function getError() {
    genDiff(filePath1, filePath2, format);
  }
  expect(getError).toThrow(error);
});

test.each([
  {
    fileDiffTree: 'tree3.json', format: 'stylish', error: 'Unknown type: wrongType!',
  },
  {
    fileDiffTree: 'tree3.json', format: 'plain', error: 'Unknown type: wrongType!',
  },
])('Start with error for $fileDiffTree, error - $error', ({
  fileDiffTree, format, error,
}) => {
  const diffTree = JSON.parse(readFileSync(getFixturePath(fileDiffTree), 'utf-8'));
  function getError() {
    getFormatteDiff(format, diffTree);
  }
  expect(getError).toThrow(error);
});
