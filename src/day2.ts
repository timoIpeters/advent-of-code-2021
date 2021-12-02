import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day2_input.txt';

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);
  let depth = 0;
  let horPos = 0;

  inputArr.forEach(line => {
    const [cmd, val] = line.split(" ");
    if (cmd === "forward") {
      horPos += +val;
    } else if (cmd === "down") {
      depth += +val;
    } else if (cmd === "up") {
      depth -= +val;
    }
  });

  console.log(`Part One: horPos = ${horPos}, depth = ${depth}, res = ${horPos*depth}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);
  let depth = 0;
  let horPos = 0;
  let aim = 0;

  inputArr.forEach(line => {
    const [cmd, val] = line.split(" ");
    if (cmd === "forward") {
      horPos += +val;
      depth += aim * +val;
    } else if (cmd === "down") {
      aim += +val;
    } else if (cmd === "up") {
      aim -= +val;
    }
  });

  console.log(`Part Two: horPos = ${horPos}, depth = ${depth}, aim = ${aim}, res = ${horPos*depth}`);
}

solvePartOne();
solvePartTwo();
