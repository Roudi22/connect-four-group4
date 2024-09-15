import { AIPlayer } from './AIPlayer';
import { Board } from './Board';

export type PlayerSymbol = 'X' | 'O';
export type Player = HumanPlayer | AIPlayer;

// abstract class cannot be instanciated,
// but saves typing shared variables for human and ai classes
export abstract class PlayerBaseClass {
  public name: string;
  public symbol: PlayerSymbol;
  public image?: string;

  constructor(name: string, symbol: PlayerSymbol, image?: string) {
    this.name = name;
    this.symbol = symbol;
    this.image = image;
  }
}

export class HumanPlayer extends PlayerBaseClass {
  constructor(name: string, symbol: PlayerSymbol, image?: string) {
    super(name, symbol, image);
  }

  public playTurn(board: Board, col: number) {
    const lastMove = board.makeMove(col, this.symbol);
    return lastMove.x >= 0 && lastMove.y >= 0;
  }
}
