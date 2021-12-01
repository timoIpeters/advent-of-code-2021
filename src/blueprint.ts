import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'blueprint.txt';

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`PartTwo: ${inputArr}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);

  console.log(`PartOne: ${inputArr}`);
}

solvePartOne();
solvePartTwo();
