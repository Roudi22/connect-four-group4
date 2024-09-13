import { PlayerSymbol } from './Player';

export type BoardCell = '' | PlayerSymbol;
export type BoardGrid = BoardCell[][];
export type BoardLocation = { x: number; y: number };

export class Board {
  private grid: BoardGrid;
  public lastMove: BoardLocation;

  constructor(public rows: number = 6, public cols: number = 7) {
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    this.lastMove = { x: -1, y: -1 };
  }

  // NOTE: return value is only needed for AI
  public makeMove(col: number, symbol: PlayerSymbol) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.grid[row][col] === '') {
        this.grid[row][col] = symbol;
        this.lastMove = { x: col, y: row };
        return this.lastMove;
      }
    }
    this.lastMove = { x: -1, y: -1 };
    return this.lastMove;
  }

  // NOTE: Method only needed for AI
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
