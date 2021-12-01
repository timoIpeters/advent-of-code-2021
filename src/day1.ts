import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day1_input.txt';

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoNumArr(INPUT_FILE);
  let count = 0;

  for (let i = 1; i < inputArr.length; i++) {
    if (inputArr[i - 1] < inputArr[i]) {
      count++;
    }
  }

  console.log(`PartOne: ${count}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoNumArr(INPUT_FILE);
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

solvePartOne();
solvePartTwo();
