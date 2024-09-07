import { saveScoreToLocalStorage } from '../utils/scoreboardLocalstorage';
import { Board, BoardGrid } from './Board';
import { Player } from './Player';
import { WinChecker } from './WinChecker';

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  private movesCount: { [key: string]: number }; // Tracks moves for each player

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.movesCount = { X: 0, O: 0 }; // Initialize move counts
  }

  public moveToNextTurn() {
    const prevPlayer = this.getCurrentPlayer();

    // Increment move count for the current player
    // NOTE: could be moved to player class?
    this.movesCount[prevPlayer.symbol]++;

    this.updateWinner();
    if (this.winner) return true;
    if (this.board.isFull()) return true;

    this.switchPlayer();
    return false;
  }

  private updateWinner() {
    const grid = this.getGrid();
    const currentPlayer = this.getCurrentPlayer();
    const lastMove = this.board.lastMove;

    if (WinChecker.checkForWin(lastMove, grid)) {
      this.winner = currentPlayer;

      // Save the score to localStorage when the game ends
      saveScoreToLocalStorage(
        currentPlayer.name,
        this.movesCount[currentPlayer.symbol]
      );
    } else if (this.board.isFull()) {
      this.winner = null; // It's a draw
    }
    return true;
  }

  private switchPlayer(): void {
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }

  public getBoard(): Board {
    return this.board;
  }

  public getGrid(): BoardGrid {
    return this.board.getGrid();
  }

  public getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
