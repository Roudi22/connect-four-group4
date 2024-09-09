import { saveScoreToLocalStorage } from '../utils/scoreboardLocalstorage';
import { Board, BoardGrid, BoardLocation } from './Board';
import { Player } from './Player';
import { WinChecker } from './WinChecker';

export class Game {
  private board: Board;
  public players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  public winningConnection: BoardLocation[] | null;
  private movesCount: { [key: string]: number }; // Tracks moves for each player

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 1; // NOTE: switchPlayer runs before first turn, so player with index 0 will start
    this.winner = null;
    this.winningConnection = null;

    this.movesCount = { X: 0, O: 0 }; // Initialize move counts
  }

  /** @returns is the game over (win or draw) */
  public moveToNextTurn() {
    const prevPlayer = this.getCurrentPlayer();

    // Increment move count for the current player
    // NOTE: could be moved to player class?
    this.movesCount[prevPlayer.symbol]++;

    this.updateWinner();
    if (this.winner) return true;
    if (this.board.isFull()) return true; // It's a draw

    this.switchPlayer();
    return false;
  }

  private updateWinner() {
    const grid = this.getGrid();
    const currentPlayer = this.getCurrentPlayer();
    const lastMove = this.board.lastMove;

    const winningConnection = WinChecker.checkForWin(lastMove, grid);
    if (winningConnection) {
      this.winner = currentPlayer;
      this.winningConnection = winningConnection;

      // Save the score to localStorage when the game ends
      saveScoreToLocalStorage(
        currentPlayer.name,
        this.movesCount[currentPlayer.symbol]
      );
    }
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
