import { AIPlayer } from './AIPlayer';
import { Board, BoardGrid, BoardLocation } from './Board';
import { HumanPlayer, Player, PlayerSymbol } from './Player';
import { WinChecker } from './WinChecker';
import { ScoreboardLocalStorage } from './ScoreLocalstorage';

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
      let difficultyPvP = 0;
      let scoreMultiplier = 1; // Default score multiplier
      if (prevPlayer instanceof HumanPlayer) {
        // Human player won, check if opponent is AI
        const opponent = this.players.find((player) => player !== prevPlayer);
        if (opponent instanceof AIPlayer) {
          // Log the outcome based on the AI difficulty level
          if (opponent.difficulty == 1) {
            // difficulty 1 = Easy
            difficultyPvP = opponent.difficulty;
            scoreMultiplier = 0.5; // Easy AI score multiplier

            // Console log (Not necessary)
            console.log(
              `${prevPlayer.name} won against AI with difficulty: Easy`
            );
            console.log(`difficultyPvP: ${difficultyPvP}`);
          } else if (opponent.difficulty == 3) {
            // difficulty 2 = Hard
            difficultyPvP = opponent.difficulty;
            scoreMultiplier = 2; // Hard AI score multiplier

            // Console log (Not necessary)
            console.log(
              `${prevPlayer.name} won against AI with difficulty: Hard`
            );
            // Console log (Not necessary)
            console.log(`difficultyPvP: ${difficultyPvP}`);
          } else {
            // Console log (Not necessary)
            console.log(
              `${prevPlayer.name} won against AI with difficulty: Unknown`
            );
            // Console log (Not necessary)
            console.log(`difficultyPvP: ${difficultyPvP}`);
          }
        }

        // Validate score and check if it's an "Impossible score"
        const isValid = this.validateScore(prevPlayer.symbol);

        if (isValid) {
          // If the score is valid, calculate and log the move multiplier
          const moveMultiplier = this.calculateMoveMultiplier(
            prevPlayer.symbol
          );
          // Log move multiplier (Not necessary)
          console.log(
            `Move multiplier for ${prevPlayer.symbol}:`,
            moveMultiplier
          );

          // Calculate the time multiplier based on the time taken for the move
          const timeTaken = this.timeSpent[prevPlayer.symbol];
          const timeMultiplier = this.calculateTimeMultiplier(timeTaken);

          // Log time multiplier (Not necessary)
          console.log(
            `Time multiplier for ${prevPlayer.symbol}:`,
            timeMultiplier
          );

          // Calculate the final score
          const baseScore = moveMultiplier * timeMultiplier;
          const finalScore = Math.round(baseScore * scoreMultiplier); // Apply the score multiplier and round to nearest whole number if needed
          const isDifficulty = difficultyPvP;

          // Console log (Not necessary)
          console.log(`Score ${prevPlayer.symbol}:`, finalScore); // score

          // Only saves the score and time to localstorage if it is valid
          ScoreboardLocalStorage.saveScore(
            prevPlayer.name,
            this.movesCount[prevPlayer.symbol],
            timeTaken,
            finalScore,
            isPvP, // The game mode
            isDifficulty // The difficulty mode
          );
        } else {
          alert('Impossible score!'); // Show popup if the score is invalid
        }
      } else {
        console.log('AI won, score is not added to the scoreboard');
      }
    }
  }

  private validateScore(symbol: PlayerSymbol): boolean {
    const moves = this.movesCount[symbol];

    // If moves are less than 4 or the move multiplier exceeds 17, it's an impossible score
    const moveMultiplier = this.calculateMoveMultiplier(symbol);
    return moves >= 4 && moveMultiplier <= 17;
  }

  // moves converted to multiplier (more moves = lower multiplier)
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
