import { AIPlayer } from './AIPlayer';
import { Board, BoardGrid, BoardLocation } from './Board';
import { HumanPlayer, Player } from './Player';
import { WinChecker } from './WinChecker';
import { ScoreManager } from './ScoreManager'; // Score tracking and validation

export class Game {
  private board: Board;
  public players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  public winningConnection: BoardLocation[] | null;
  private scoreManager: ScoreManager; // Score tracking and validation
  private startTime: number; // The time when the current player's turn started

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 1; // NOTE: switchPlayer runs before first turn, so player with index 0 will start
    this.winner = null;
    this.winningConnection = null;
    this.scoreManager = new ScoreManager();
    this.startTime = Date.now(); // Start time for the first player
  }

  /** @returns is the game over (win or draw) */
  public moveToNextTurn() {
    const prevPlayer = this.getCurrentPlayer();

    // Move count for the current player
    this.scoreManager.incrementMove(prevPlayer.symbol);

    // Calculate and add time spent by current player
    const currentTime = Date.now();
    this.scoreManager.addTime(
      prevPlayer.symbol,
      Math.floor((currentTime - this.startTime) / 1000)
    );
    this.startTime = currentTime; // Reset start time for the next player

    this.updateWinner();
    if (this.winner) return true;
    if (this.board.isFull()) return true; // It's a draw TODO: Handle draw somehow

    this.switchPlayer();
    return false;
  }

  public isTie() {
    return !this.winner && this.board.isFull();
  }

  private updateWinner() {
    const grid = this.getGrid();
    const prevPlayer = this.getCurrentPlayer();
    const lastMove = this.board.lastMove;

    const winningConnection = WinChecker.checkForWin(lastMove, grid);

    if (winningConnection) {
      this.winner = prevPlayer;
      this.winningConnection = winningConnection;

      // Check if the game is PvP or PvE
      const isPvP =
        this.players[0] instanceof HumanPlayer &&
        this.players[1] instanceof HumanPlayer;
      let scoreMultiplier = 1; // Default score multiplier
      let difficultyPvP = 0;

      if (prevPlayer instanceof HumanPlayer) {
        // Human player won, check if opponent is AI
        const opponent = this.players.find((player) => player !== prevPlayer);
        if (opponent instanceof AIPlayer) {
          // Log the outcome based on the AI difficulty level
          if (opponent.difficulty == 1) {
            // difficulty 1 = Easy
            difficultyPvP = opponent.difficulty;
            scoreMultiplier = 0.5; // Easy AI score multiplier
          } else if (opponent.difficulty == 3) {
            // difficulty 2 = Hard
            difficultyPvP = opponent.difficulty;
            scoreMultiplier = 2; // Hard AI score multiplier
          }
        }

        // Validate score and check if it's an "Impossible score"
        const isValid = this.scoreManager.validateScore(prevPlayer.symbol);
        if (isValid) {
          // If the score is valid, calculate and log the move multiplier
          const moveMultiplier = this.scoreManager.calculateMoveMultiplier(
            prevPlayer.symbol
          );

          // Calculate the time multiplier based on the time taken for the move
          const timeTaken = this.scoreManager.getTimeSpent()[prevPlayer.symbol];
          const timeMultiplier =
            this.scoreManager.calculateTimeMultiplier(timeTaken);

          // Apply the score multiplier and round to nearest whole number if needed
          const finalScore = Math.round(
            moveMultiplier * timeMultiplier * scoreMultiplier
          );

          this.scoreManager.saveScore(
            prevPlayer,
            finalScore,
            isPvP,
            difficultyPvP
          );
        } else {
          alert('Impossible score!'); // Show popup if the score is invalid
        }
      }
    }
  }

  private switchPlayer(): void {
    // Switch the current player and update start time
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.startTime = Date.now(); // Set the start time for the new player
  }

  public getTimeSpent() {
    return this.scoreManager.getTimeSpent();
  }

  public getMovesCount() {
    return this.scoreManager.getMovesCount();
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
