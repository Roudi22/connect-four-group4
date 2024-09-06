import { Board, BoardGrid } from './Board';
import { Player } from './Player';
import { WinChecker } from './WinChecker';

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.winner = null;
  }

  public play() {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.isAI) {
      const col = currentPlayer.playTurn(this.board);
      this.board.makeMove(col, currentPlayer.symbol);
      this.switchPlayer();
    }
  }

  public playTurn(col: number): boolean {
    if (this.winner) return false;

    const grid = this.getGrid();
    const currentPlayer = this.getCurrentPlayer();
    const lastMove = this.board.makeMove(col, currentPlayer.symbol);
    console.log({ currentPlayer, index: this.currentPlayerIndex });

    if (lastMove.x < 0 || lastMove.y < 0) return false;

    if (WinChecker.checkForWin(lastMove, grid)) {
      this.winner = currentPlayer;
    } else if (this.board.isFull()) {
      this.winner = null; // It's a draw
    } else {
      this.switchPlayer();
      if (currentPlayer.isAI) {
        this.board.makeMove(
          currentPlayer.playTurn(this.board),
          currentPlayer.symbol
        );
      }
    }
    return true;
  }

  private switchPlayer(): void {
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }

  public getGrid(): BoardGrid {
    return this.board.getGrid();
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
}
