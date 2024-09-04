import { Board } from './Board';

export class WinChecker {
  constructor(private board: Board) {}

  public checkForWin(symbol: string): boolean {
    const grid = this.board.getGrid();

    return (
      this.checkHorizontal(grid, symbol) ||
      this.checkVertical(grid, symbol) ||
      this.checkDiagonal(grid, symbol)
    );
  }

  private checkHorizontal(grid: string[][], symbol: string): boolean {
    for (const row of grid) {
      for (let col = 0; col <= grid[0].length - 4; col++) {
        if (row.slice(col, col + 4).every((cell) => cell === symbol)) {
          return true;
        }
      }
    }
    return false;
  }

  private checkVertical(grid: string[][], symbol: string): boolean {
    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 0; row <= grid.length - 4; row++) {
        if ([0, 1, 2, 3].every((i) => grid[row + i][col] === symbol)) {
          return true;
        }
      }
    }
    return false;
  }

  private checkDiagonal(grid: string[][], symbol: string): boolean {
    // Diagonal nedåt höger
    for (let row = 0; row <= grid.length - 4; row++) {
      for (let col = 0; col <= grid[0].length - 4; col++) {
        if ([0, 1, 2, 3].every((i) => grid[row + i][col + i] === symbol)) {
          return true;
        }
      }
    }

    // Diagonal uppåt höger
    for (let row = 3; row < grid.length; row++) {
      for (let col = 0; col <= grid[0].length - 4; col++) {
        if ([0, 1, 2, 3].every((i) => grid[row - i][col + i] === symbol)) {
          return true;
        }
      }
    }

    return false;
  }
}

const directions = [
  {
    label: 'upDown',
    forward: { x: 0, y: -1 },
    reverse: { x: 0, y: 1 },
  },
  {
    label: 'nwSe',
    forward: { x: -1, y: -1 },
    reverse: { x: 1, y: 1 },
  },
  {
    label: 'leftRight',
    forward: { x: -1, y: 0 },
    reverse: { x: 1, y: 0 },
  },
  {
    label: 'neSw',
    forward: { x: 1, y: -1 },
    reverse: { x: -1, y: 1 },
  },
];

