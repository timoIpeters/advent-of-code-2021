import { finished } from 'stream';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day6_example.txt';

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);

  let lanternfishArr = inputArr[0].split(",").map(val => +val);
  for(let day = 1; day <= 80; day++) {
    for (let i = lanternfishArr.length - 1; i >= 0; i--) {
      const fish = lanternfishArr[i];
      if (fish > 0) {
        lanternfishArr[i] -= 1;
      } else {
        lanternfishArr[i] = 6;
        lanternfishArr.push(8);
      }
    }
  }

  const res = lanternfishArr.length;
  console.log(`Part One: ${res} fish`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE)[0].split(",").map(val => +val);

  console.log(`Part Two: ${inputArr}`);
}

solvePartOne();
// solvePartTwo();
