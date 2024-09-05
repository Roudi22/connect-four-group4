import { Board } from './Board';
import { WinChecker } from './WinChecker';

export type PlayerSymbol = 'X' | 'O';
export type Player = HumanPlayer | AIPlayer;

abstract class PlayerBaseClass {
  public name: string;
  public symbol: PlayerSymbol;
  public isAI: boolean;

  constructor(name: string, symbol: PlayerSymbol, isAI: boolean) {
    this.name = name;
    this.symbol = symbol;
    this.isAI = isAI;
  }

  public abstract playTurn(board: Board): number;
}

export class HumanPlayer extends PlayerBaseClass {
  constructor(name: string, symbol: PlayerSymbol) {
    super(name, symbol, false);
  }

  public playTurn(board: Board): number {
    console.log(board);
    return 1;
  }
}

export class AIPlayer extends PlayerBaseClass {
  difficulty;

  constructor(difficulty: number, symbol: PlayerSymbol) {
    super(`Difficulty ${difficulty} AI`, symbol, true);
    this.difficulty = difficulty;
  }

  public playTurn(board: Board): number {
    return this.playAITurn(board);
  }

  private playAITurn(board: Board): number {
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
      if (WinChecker.checkForWin(board.makeMove(col, symbol), grid)) {
        board.undoMove(col); // Undo the move to keep the board state
        return col;
      }
      board.undoMove(col); // Undo the move to keep the board state
    }
    return null;
  }
}
