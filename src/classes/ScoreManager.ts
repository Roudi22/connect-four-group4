import { ScoreboardLocalStorage } from './ScoreLocalstorage';
import { PlayerSymbol, Player } from './Player';

// Handles the tracking and validation of player scores
export class ScoreManager {
  private movesCount: { [key: string]: number }; // Tracks moves for each player
  private timeSpent: { [key: string]: number }; // Tracks time spent by each player in seconds

  constructor() {
    this.movesCount = { X: 0, O: 0 }; // Initialize move counts and set to default value
    this.timeSpent = { X: 0, O: 0 }; // Initialize time spent and set to default value
  }
  // Increment move count for the current player
  public incrementMove(symbol: PlayerSymbol) {
    this.movesCount[symbol]++;
  }

  // Adds the time taken by the player to their total time
  public addTime(symbol: PlayerSymbol, time: number) {
    this.timeSpent[symbol] += time;
  }

  // If moves are less than 4 or the move multiplier exceeds 17, it's an impossible score
  public validateScore(symbol: PlayerSymbol): boolean {
    const moves = this.movesCount[symbol];
    const moveMultiplier = this.calculateMoveMultiplier(symbol);
    return moves >= 4 && moveMultiplier <= 17;
  }

  // moves converted to multiplier (more moves = lower multiplier)
  public calculateMoveMultiplier(symbol: PlayerSymbol): number {
    const moves = this.movesCount[symbol];
    if (moves >= 4 && moves <= 21) {
      return 21 - moves; // Example: 4 moves -> 17 multiplier, 5 moves -> 16 multiplier
    }
    return 0; // Invalid moves (less than 4 or over 21)
  }

  // Time converted to multiplier (more time = lower multiplier)
  public calculateTimeMultiplier(timeTaken: number): number {
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

  // Saves the player score to local storage
  public saveScore(
    player: Player,
    finalScore: number,
    isPvP: boolean,
    difficulty: number
  ) {
    const symbol = player.symbol;
    const moves = this.movesCount[symbol];
    const timeTaken = this.timeSpent[symbol];

    // Send a valid score to local storage function
    ScoreboardLocalStorage.saveScore(
      player.name,
      moves,
      timeTaken,
      finalScore,
      isPvP, // The game mode
      difficulty // The difficulty
    );
  }

  // Move count
  public getMovesCount() {
    return this.movesCount;
  }

  // Time spent
  public getTimeSpent() {
    return this.timeSpent;
  }
}
