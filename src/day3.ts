import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day3_input.txt';

/** solution */
function getAmountOfZeroAndOneBits(inputArr: string[]) {
  let zeroBits = new Array(inputArr[0].length).fill(0);
  let oneBits = new Array(inputArr[0].length).fill(0);

  inputArr.forEach(val => {
    for (let i = 0; i < val.length; i++) {
      if(val.charAt(i) === "0") {
        zeroBits[i]++;
      } else {
        oneBits[i]++;
      }
    }
  });
  return {zeroBits, oneBits};
}
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);
  const bitCnt = getAmountOfZeroAndOneBits(inputArr);

  let gammaVal = "";
  let epsilonVal = "";

  for (let i = 0; i < inputArr[0].length; i++) {
    gammaVal += bitCnt.oneBits[i] > bitCnt.zeroBits[i] ? "1" : "0";
    epsilonVal += bitCnt.zeroBits[i] > bitCnt.oneBits[i] ? "1" : "0";
  }

  const res = parseInt(gammaVal, 2) * parseInt(epsilonVal, 2);
  console.log(`Part One: gammaVal = ${gammaVal}, epsilonVal = ${epsilonVal}, res = ${res}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE);
  let bitCnt = getAmountOfZeroAndOneBits(inputArr);

  // calculate Oxygen Generator Rating
  let oneBitArr = inputArr; 
  for (let i = 0; i < inputArr[0].length; i++) {
    if(oneBitArr.length === 0)
      return;
    if(bitCnt.oneBits[i] >= bitCnt.zeroBits[i]) {
      oneBitArr = oneBitArr.filter(val => val.charAt(i) === "1");
    } else {
      oneBitArr = oneBitArr.filter(val => val.charAt(i) === "0");
    }
    bitCnt = getAmountOfZeroAndOneBits(oneBitArr);
  }

  // reset bitCnt
  bitCnt = getAmountOfZeroAndOneBits(inputArr);

  // calculate CO2 Scrubber Rating
  let zeroBitArr = inputArr; 
  for (let i = 0; i < inputArr[0].length; i++) {
    if (zeroBitArr.length !== 1) {
      if(bitCnt.zeroBits[i] <= bitCnt.oneBits[i]) {
        zeroBitArr = zeroBitArr.filter(val => val.charAt(i) === "0");
      } else {
        zeroBitArr = zeroBitArr.filter(val => val.charAt(i) === "1");
      }
      bitCnt = getAmountOfZeroAndOneBits(zeroBitArr);
    }
  }

  const oxygenGeneratorRating = oneBitArr[0];
  const co2ScrubberRating = zeroBitArr[0];
  const res = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
  console.log(`Part Two: oxygen = ${oxygenGeneratorRating}, co2 = ${co2ScrubberRating}, res = ${res}`);
}

solvePartOne();
solvePartTwo();
