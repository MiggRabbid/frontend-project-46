import { readFileSync } from 'node:fs';

const readFile = (filepath) => JSON.parse(readFileSync(filepath, 'utf-8'));

export default readFile;
