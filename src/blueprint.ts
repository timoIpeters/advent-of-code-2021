import { Utility } from './utilities';
import * as fs from 'fs';

/** filename -> located in the data folder */
const INPUT_FILE = 'test.txt';

/** passing given input to the solve function */
fs.readFile(`../data/${INPUT_FILE}`, 'utf-8', (err, data) => {
  if (err) throw err;
  solve(data);
});

/** solution */
function solve(input: string): void {
  console.log(`Result: ${input}`);
}
