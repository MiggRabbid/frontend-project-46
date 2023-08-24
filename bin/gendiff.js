#!/usr/bin/env node
import { program } from 'commander';
import { readFile, genDiff } from '../src/index.js'

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
        const file1 = readFile(filepath1);
        const file2 = readFile(filepath2);
        genDiff(file1, file2);
    });

program.parse();
