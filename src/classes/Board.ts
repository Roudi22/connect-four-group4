import { PlayerSymbol } from './Player';

export type BoardCell = '' | PlayerSymbol;
export type BoardGrid = BoardCell[][];
export type BoardLocation = { x: number; y: number };

export class Board {
  private grid: BoardGrid;

  constructor(
    public rows: number = 6,
    public cols: number = 7
  ) {
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(''));
  }

  public makeMove(col: number, symbol: PlayerSymbol): BoardLocation {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][col] === '') {
        this.grid[row][col] = symbol;
        return { x: col, y: row };
      }
    }
    return { x: -1, y: -1 };
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

  public getAvailableColumns(): number[] {
    const availableCols: number[] = [];
    for (let col = 0; col < this.grid[0].length; col++) {
      if (this.grid[0][col] === '') {
        availableCols.push(col);
      }
    }
    return availableCols;
  }
}
