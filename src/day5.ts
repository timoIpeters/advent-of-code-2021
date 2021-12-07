import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day5_input.txt';

class Interval {
  constructor(public x0: number, public y0: number, public x1: number, public y1: number){}
}

class Diagram {
  public values: number[][];

  constructor(intervals: Interval[]) {
    const maxConstraints = findMaxXAndY(intervals);
    this.values = Array(maxConstraints.maxX + 1).fill(0).map(() => Array(maxConstraints.maxY + 1).fill(0));
  }

  incrementAtInterval(interval: Interval) {
    const {x0,y0,x1,y1} = interval;
  
    if (x0 === x1 || y0 === y1) {
      const x0Smaller = x0 <= x1;
      const y0Smaller = y0 <= y1;

      if (x0Smaller && y0Smaller) {
        for (let x = x0; x <= x1; x++) {
          for (let y = y0; y <= y1; y++) {
            this.values[x][y]++;
          }
        }
      } else if (x0Smaller && !y0Smaller) {
        for (let x = x0; x <= x1; x++) {
          for (let y = y0; y >= y1; y--) {
            this.values[x][y]++;
          }
        }
      } else if (!x0Smaller && y0Smaller) {
        for (let x = x0; x >= x1; x--) {
          for (let y = y0; y <= y1; y++) {
            this.values[x][y]++;
          }
        }
      } else if (!x0Smaller && !y0Smaller) {
        for (let x = x0; x >= x1; x--) {
          for (let y = y0; y >= y1; y--) {
            this.values[x][y]++;
          }
        }
      }
    }
  }

  incrementAtIntervalWithDiagonals(interval: Interval) {
    let {x0,y0,x1,y1} = interval;

    // op1 != op2 === XOR
    if ((x0 === x1) != (y0 === y1)) {
      // e.g. 7,9 -> 9,9 => (7,9),(8,9),(9,9)
      this.incrementAtInterval(interval);
    } else if (x0 === y0 && x1 === y1) {
        // e.g 7,7 -> 9,9 => (7,7),(8,8),(9,9)
        if (x0 < x1) {
          for (let x = x0; x <= x1; x++) {
            this.values[x][x]++;
          }
        } else {
          for (let x = x1; x <= x0; x++) {
            this.values[x][x]++;
          }
        }
    } else {
      if (x0 < x1) {
        // e.g. 7,9 -> 9,7 => (7,9),(8,8),(9,7)
        for (let x = x0; x <= x1; x++) {
          this.values[x][y0--]++;
        }
      } else if (x0 > x1 && y0 < y1) {
        // e.g. 9,7 -> 7,9 => (9,7),(8,8),(7,9)
        for (let x = x0; x >= x1; x--) {
          this.values[x][y0++]++;
        }
      } else if (x0 > x1 && y0 > y1) {
        // e.g. 6,4 -> 2,0 => (6,4),(5,3),(4,2),(3,1),(2,0)
        for (let x = x0; x >= x1; x--) {
          this.values[x][y0--]++;
        }
      }
    }
  }

  countDangerousAreas() {
    let count = 0;
    this.values.forEach(row => row.forEach(val => val > 1 ? count++ : count));
    return count;
  }

  toString() {
    let rep = "";
    for (let i = 0; i < this.values.length; i++) {
      for(let j = 0; j < this.values[i].length; j++) {
        const val = this.values[j][i];
        rep += val === 0 ? "." : val;
      }
      rep += "\r\n";
    }
    return rep;
  }
}

function findMaxXAndY(intervals: Interval[]) {
  let maxX = -1;
  let maxY = -1;

  intervals.forEach(interval => {
    maxX = interval.x0 > maxX ? interval.x0 : interval.x1 > maxX ? interval.x1 : maxX;
    maxY = interval.y0 > maxY ? interval.y0 : interval.y1 > maxY ? interval.y1 : maxY;
  });

  return {maxX, maxY};
}

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE).filter(line => line !== "");
  const intervals = inputArr.map(intervalRep => intervalRep.split(" -> ")).map(interval => {
    const [x0, y0] = interval[0].split(",");
    const [x1, y1] = interval[1].split(",");
    return new Interval(+x0, +y0, +x1, +y1);
  });

  const diagram = new Diagram(intervals);
  intervals.forEach(interval => diagram.incrementAtInterval(interval));
  const dangerousAreas = diagram.countDangerousAreas();
  console.log(`Part One: dangerousAreas = ${dangerousAreas}`);
}

function solvePartTwo(): void {
  const inputArr = Utility.readInputIntoStringArr(INPUT_FILE).filter(line => line !== "");
  const intervals = inputArr.map(intervalRep => intervalRep.split(" -> ")).map(interval => {
    const [x0, y0] = interval[0].split(",");
    const [x1, y1] = interval[1].split(",");
    return new Interval(+x0, +y0, +x1, +y1);
  });

  const diagram = new Diagram(intervals);
  intervals.forEach(interval => diagram.incrementAtIntervalWithDiagonals(interval));
  const dangerousAreas = diagram.countDangerousAreas();
  console.log(`Part Two: dangerousAreas = ${dangerousAreas}`);
}

solvePartOne();
solvePartTwo();
