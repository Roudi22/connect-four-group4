import { AIPlayer } from './AIPlayer';
import { Board } from './Board';

export type PlayerSymbol = 'X' | 'O';
export type Player = HumanPlayer | AIPlayer;

// abstract class cannot be instanciated,
// but saves typing shared variables for human and ai classes
export abstract class PlayerBaseClass {
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

// glorious extends ladder! :D
// would have been easier with three types/interfaces instaed of classes
export class SignedInPlayer extends HumanPlayer {
  public imageUrl;

  constructor(name: string, symbol: PlayerSymbol, imageUrl: string) {
    super(name, symbol);
    this.imageUrl = imageUrl;
  }
}
