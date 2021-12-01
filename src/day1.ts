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

  console.log(`Part One: ${count}`);
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

  console.log(`Part Two: ${count}`);
}

function altSolvePartOne() {
  const inputArr = Utility.readInputIntoNumArr(INPUT_FILE);
  const res = inputArr.reduce((acc, curr, currIdx, arr) => curr > arr[currIdx - 1] ? acc + 1 : acc, 0);
  console.log(`Alternative Part One: ${res}`);
}

function altSolvePartTwo() {
  const inputArr = Utility.readInputIntoNumArr(INPUT_FILE);
  const res = inputArr.map((val, idx, arr) => val + arr[idx+1] + arr[idx+2]).reduce((acc, curr, currIdx, arr) => curr > arr[currIdx - 1] ? acc + 1 : acc, 0);
  console.log(`Alternative Part Two: ${res}`);
}

solvePartOne();
altSolvePartOne();
solvePartTwo();
altSolvePartTwo();
