import { Utility } from './utilities';
import * as fs from 'fs';

/** filename -> located in the data folder */
const INPUT_FILE = 'day1_input.txt';

/** passing given input to the solve function */
fs.readFile(`./data/${INPUT_FILE}`, 'utf-8', (err, data) => {
  if (err) throw err;
  solvePartOne(data);
  solvePartTwo(data);
});

/** solution */
function solvePartOne(input: string): void {
  const inputArr = input.split('\r\n').map(val => +val);
  let count = 0;

  for (let i = 1; i < inputArr.length; i++) {
    if(inputArr[i-1] < inputArr[i]) {
      count++;
    }
  }

  console.log(`PartOne: ${count}`);
}

function solvePartTwo(input: string): void {
  const inputArr = input.split('\r\n').map(val => +val);
  let count = 0;

  const sumArr = [];

  for (let i = 2; i < inputArr.length; i++) {
    sumArr.push(inputArr[i] + inputArr[i - 1] + inputArr[i - 2]);
  }

  for (let i = 1; i < sumArr.length; i++) {
    if (sumArr[i - 1] < sumArr[i]) {
      count++;
    }
  }

  console.log(`PartTwo: ${count}`);
}
