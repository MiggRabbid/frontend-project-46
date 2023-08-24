#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const readFile = (filepath) => JSON.parse(readFileSync(filepath, 'utf-8'));

const genDiff = (file1, file2) => {
  let result = '{';
  const keysFromFile1 = Object.keys(file1).sort();
  const keysFromFile2 = Object.keys(file2).sort();
  keysFromFile1.map((key) => {
    if (keysFromFile2.includes(key) && _.isEqual(file1[key], file2[key])) {
      result = `${result}\n    ${key}: ${file1[key]}`;
    } else if (keysFromFile2.includes(key) && !_.isEqual(file1[key], file2[key])) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
      result = `${result}\n  + ${key}: ${file2[key]}`;
    } else if (!keysFromFile2.includes(key)) {
      result = `${result}\n  - ${key}: ${file1[key]}`;
    }
  });
  keysFromFile2.map((key) => {
    if (!keysFromFile1.includes(key)) {
      result = `${result}\n  + ${key}: ${file2[key]}`;
    }
  });
  return console.log(`${result}\n}`);
};

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    genDiff(file1, file2);
  });

program.parse();

export default genDiff;
