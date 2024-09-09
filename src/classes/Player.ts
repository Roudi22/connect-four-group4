import { Board } from './Board';
import { WinChecker } from './WinChecker';

export type PlayerSymbol = 'X' | 'O';
export type Player = HumanPlayer | AIPlayer;

// abstract class cannot be instanciated,
// but saves typing shared variables for human and ai classes
abstract class PlayerBaseClass {
  public name: string;
  public symbol: PlayerSymbol;

  constructor(name: string, symbol: PlayerSymbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

export class HumanPlayer extends PlayerBaseClass {
  constructor(name: string, symbol: PlayerSymbol) {
    super(name, symbol);
  }

  public playTurn(board: Board, col: number) {
    const lastMove = board.makeMove(col, this.symbol);
    return lastMove.x >= 0 && lastMove.y >= 0;
  }
}

export class AIPlayer extends PlayerBaseClass {
  public difficulty;

  constructor(difficulty: number, symbol: PlayerSymbol) {
    super(`Difficulty ${difficulty} AI`, symbol);
    this.difficulty = difficulty;
  }

  public playTurn(board: Board): number {
    if (this.difficulty === 1) return this.dumbAI(board);

    return this.easyAI(board);
  }

  private dumbAI(board: Board): number {
    const availableCols = board.getAvailableColumns();
    if (availableCols.length > 0) {
      return availableCols[Math.floor(Math.random() * availableCols.length)];
    }

    // FIX: A full board should not let anyone playTurn
    return 1;
  }

  private easyAI(board: Board): number {
    const mySymbol = this.symbol;
    const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';

    // 1. Check if AI can win on this move
    let col = this.findWinningMove(mySymbol, board);
    if (col !== null) {
      return col;
    }

    // 2. Check if opponent can win next move, block it
    col = this.findWinningMove(opponentSymbol, board);
    if (col !== null) {
      return col;
    }

    // 3. If no immediate win or block, choose a random available column
    const availableCols = board.getAvailableColumns();
    if (availableCols.length > 0) {
      col = availableCols[Math.floor(Math.random() * availableCols.length)];
      return col;
    }

    // FIX: A full board should not let anyone playTurn
    return 1;
  }

  private findWinningMove(symbol: PlayerSymbol, board: Board): number | null {
    const grid = board.getGrid();

    for (let col = 0; col < grid[0].length; col++) {
      const move = board.makeMove(col, symbol);
      if (move.x < 0 || move.y < 0) continue;
      if (WinChecker.checkForWin(move, grid)) {
        board.undoMove(col); // Undo the move to keep the board state
        return col;
      }
      board.undoMove(col); // Undo the move to keep the board state
    }
    return null;
  }
}
