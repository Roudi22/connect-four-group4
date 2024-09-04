import { PlayerSymbol } from './Player';

export type BoardCell = '' | PlayerSymbol;
export type BoardGrid = BoardCell[][];

export class Board {
  private grid: BoardGrid;

  constructor(
    public rows: number = 6,
    public cols: number = 7
  ) {
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(''));
  }

  public makeMove(col: number, symbol: BoardCell): boolean {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][col] === '') {
        this.grid[row][col] = symbol;
        return true;
      }
    }
    return false;
  }

  // In Board class

  public undoMove(col: number): void {
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row][col] !== '') {
        this.grid[row][col] = '';
        break;
      }
    }
  }

  public isFull(): boolean {
    return this.grid.every((row) => row.every((cell) => cell !== ''));
  }

  public getGrid() {
    return this.grid;
  }
}
