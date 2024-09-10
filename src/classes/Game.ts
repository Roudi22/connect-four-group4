import { Board, BoardGrid, BoardLocation } from './Board';
import { Player, PlayerSymbol } from './Player';
import { WinChecker } from './WinChecker';
import { ScoreboardLocalStorage } from './scoreboardLocalstorage';

export class Game {
  private board: Board;
  public players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  public winningConnection: BoardLocation[] | null;
  private movesCount: { [key: string]: number }; // Tracks moves for each player

  // Time tracking variables
  private startTime: number; // The time when the current player's turn started
  private timeSpent: { [key: string]: number }; // Tracks time spent by each player in seconds

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 1; // NOTE: switchPlayer runs before first turn, so player with index 0 will start
    this.winner = null;
    this.winningConnection = null;
    this.movesCount = { X: 0, O: 0 }; // Initialize move counts
    this.startTime = Date.now(); // Start time for the first player
    this.timeSpent = { X: 0, O: 0 }; // Initialize time spent
  }

  /** @returns is the game over (win or draw) */
  public moveToNextTurn() {
    const prevPlayer = this.getCurrentPlayer();

    // Increment move count for the current player
    // NOTE: could be moved to player class?
    this.movesCount[prevPlayer.symbol]++;

    // Calculate and add time spent by current player
    const currentTime = Date.now();
    this.timeSpent[prevPlayer.symbol] += Math.floor(
      (currentTime - this.startTime) / 1000
    );
    this.startTime = currentTime; // Reset start time for the next player

    this.updateWinner();
    if (this.winner) return true;
    if (this.board.isFull()) return true; // It's a draw TODO: Handle draw somehow

    this.switchPlayer();
    return false;
  }

  private updateWinner() {
    const grid = this.getGrid();
    const prevPlayer = this.getCurrentPlayer();
    const lastMove = this.board.lastMove;

    const winningConnection = WinChecker.checkForWin(lastMove, grid);
    if (winningConnection) {
      this.winner = prevPlayer;
      this.winningConnection = winningConnection;

      // Validate score and check if it's an "Impossible score"
      const isValid = this.validateScore(prevPlayer.symbol);
      if (isValid) {
        const moveMultiplier = this.calculateMoveMultiplier(prevPlayer.symbol);
        console.log(
          `Move multiplier for ${prevPlayer.symbol}:`,
          moveMultiplier
        ); // Log move multiplier

        // Calculate the time multiplier based on the time taken
        const timeTaken = this.timeSpent[prevPlayer.symbol];
        const timeMultiplier = this.calculateTimeMultiplier(timeTaken);
        console.log(
          `Time multiplier for ${prevPlayer.symbol}:`,
          timeMultiplier
        ); // Log time multiplier

        const finalScore = moveMultiplier * timeMultiplier;
        console.log(`Score ${prevPlayer.symbol}:`, finalScore); // score

        // Only save the score and time to localstorage if it is valid
        ScoreboardLocalStorage.saveScore(
          prevPlayer.name,
          this.movesCount[prevPlayer.symbol],
          timeTaken,
          finalScore
        );
      } else {
        alert('Impossible score!'); // Show popup if the score is invalid
      }
    }
  }

  private validateScore(symbol: PlayerSymbol): boolean {
    const moves = this.movesCount[symbol];

    // If moves are less than 4 or the move multiplier exceeds 17, it's an impossible score
    const moveMultiplier = this.calculateMoveMultiplier(symbol);
    return moves >= 4 && moveMultiplier <= 17;
  }

  // moves converted to multiplier (move moves = lower multiplier)
  private calculateMoveMultiplier(symbol: PlayerSymbol): number {
    const moves = this.movesCount[symbol];

    // Calculate multiplier based on number of moves
    if (moves >= 4 && moves <= 21) {
      return 21 - moves; // Example: 4 moves -> 17 multiplier, 5 moves -> 16 multiplier
    }
    return 0; // Invalid moves (less than 4 or over 21)
  }

  // Time converted to multiplier (more time = lower multiplier)
  private calculateTimeMultiplier(timeTaken: number): number {
    if (timeTaken < 10) {
      return 6;
    } else if (timeTaken < 20) {
      return 5;
    } else if (timeTaken < 30) {
      return 4;
    } else if (timeTaken < 40) {
      return 3;
    } else if (timeTaken < 50) {
      return 2;
    } else {
      return 1;
    }
  }

  private switchPlayer(): void {
    // Switch the current player and update start time
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.startTime = Date.now(); // Set the start time for the new player
  }

  public getTimeSpent(): { [key: string]: number } {
    return this.timeSpent;
  }

  public getMovesCount(): { [key: string]: number } {
    return this.movesCount;
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
