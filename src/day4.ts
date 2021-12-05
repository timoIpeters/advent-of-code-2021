import { clearLine } from 'readline';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day4_input_2.txt';

class Field {
  constructor(public value: number, public marked: boolean) {}
  toString() {
    return `[${this.value}, ${this.marked}]`
  }
}

class Board {
  private BOARD_SIZE = 5;
  public boardId;
  public fields: Field[][] = [];

  constructor(boardRep: string, boardId: number) {
    this.boardId = boardId;
    const rows = boardRep.split('\r\n');
    rows.forEach((row, rowIdx) => {
      this.fields[rowIdx] = [];
      let values = row.split(' ').filter(val => val !== '');
      values.forEach((val, valIdx) => {
        this.fields[rowIdx][valIdx] = new Field(+val, false);
      });
    });
  }
}

/** solution */
function solvePartOne(): void {
  const inputArr = Utility.splitInputByEmptyLine(INPUT_FILE);
  const randomNumbers = inputArr.shift()!.split(",").map(val => +val);
  const boards: Board[] = [];
  inputArr.forEach((boardRep, idx) => boards.push(new Board(boardRep, idx)));

  let winner: [boolean, number] = [false, -1];
  let lastDrawn = -1;

  // randomNumbers
  for(let i = 0; !winner[0] && i < randomNumbers.length; i++) {
    lastDrawn = randomNumbers[i];

    // boards
    for(let j = 0; !winner[0] && j < boards.length; j++) {
      // rows of one board
      for(let k = 0; !winner[0] && k < boards[j].fields.length; k++) {
        // cells in one row of a board
        for(let l = 0; l < boards[j].fields[k].length; l++) {
          let cell = boards[j].fields[k][l];
          if (cell.value === lastDrawn) {
            cell.marked = true;
          }
        }
        const fullRow = boards[j].fields[k].every(cell => cell.marked);
        let fullCol = false;
        for(let col = 0; !fullCol && col < boards[j].fields.length; col++) {
          fullCol = boards[j].fields.every(row => row[0].marked);
        }
        winner[0] = fullRow || fullCol; 
        if(winner[0]) {
          winner[1] = boards[j].boardId;
        }
      }
    }
  }

  if (winner[0]) {
    const winnerBoard = boards.find(board => board.boardId === winner[1])!;
    let winnerSum = 0;
    winnerBoard.fields.forEach(row => {
      row.forEach(cell => {
        if(!cell.marked) {
          winnerSum += +cell.value;
        }
      })
    })
    console.log(boards.find(board => board.boardId === winner[1])?.fields);
    const res = lastDrawn * winnerSum;
    console.log(`Part One: winner boardID = ${winner[1]}, last drawn = ${lastDrawn}, sum = ${winnerSum}, res = ${res}`);
  } else {
    console.log("Part One: NO WINNER");
  }
}

function solvePartTwo(): void {
  const inputArr = Utility.splitInputByEmptyLine(INPUT_FILE);
  console.log(`Part Two: ${inputArr}`);
}

solvePartOne();
// solvePartTwo();
