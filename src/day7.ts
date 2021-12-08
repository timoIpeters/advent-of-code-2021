import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day7_input.txt';

function calcCostsToVal(values: number[], destVal: number) {
  let cost = 0;
  for(let val of values) {
    cost += Math.abs(destVal - val);
  }
  return cost;
}

function calcCostsToValLinearIncrements(values: number[], destVal: number) {
  let cost = 0;
  for(let val of values) {
    const diff = Math.abs(destVal - val);
    cost += (diff * (diff + 1)) / 2;
  }
  return cost;
}

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE)[0].split(",").map(val => +val);

  let minCost = Number.MAX_VALUE;
  inputArr.forEach(val => {
    const costToVal = calcCostsToVal(inputArr, val);
    if (costToVal < minCost) minCost = costToVal;
  });

  console.log(`Part One: ${minCost}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE)[0].split(",").map(val => +val);

  let minCost = Number.MAX_VALUE;
  inputArr.forEach(val => {
    const costToVal = calcCostsToValLinearIncrements(inputArr, val);
    if (costToVal < minCost) minCost = costToVal;
  });

  console.log(`Part Two: ${minCost}`);
}

solvePartOne();
solvePartTwo();
