#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2));

program.parse();

// {
//   follow: { value: false, symbol: 'minus' },
//   host: { value: 'hexlet.io', symbol: 'spase' },
//   proxy: { value: '123.234.53.22', symbol: 'minus' },
//   timeout: { value1: 50, value2: 20, symbol: 'minus&plus' },
//   verbose: { value: true, symbol: 'plus' }
// }
