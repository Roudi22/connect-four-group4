export interface Score {
  winnerName: string;
  moves: number;
  time: number;
  score: number;
}

export class ScoreboardLocalStorage {
  private static readonly PVP_STORAGE_KEY = 'connect4PvPScoreboard'; // Key for Player vs Player scoreboard
  private static readonly PVE_STORAGE_KEY_EASY = 'connect4PvEScoreboardEasy'; // Key for Player vs AI (Easy) scoreboard
  private static readonly PVE_STORAGE_KEY_HARD = 'connect4PvEScoreboardHard'; // Key for Player vs AI (Hard) scoreboard

  public static saveScore(
    winnerName: string,
    moves: number,
    time: number,
    finalScore: number,
    isPvP: boolean, // Determine if it's PvP or PvE
    isDifficulty: number // Difficulty select
  ): void {
    // Determines the appropriate storage key based on game type and difficulty
    const storageKey = isPvP
      ? this.PVP_STORAGE_KEY
      : isDifficulty === 3
      ? this.PVE_STORAGE_KEY_HARD
      : this.PVE_STORAGE_KEY_EASY;

    // Get the current scoreboard from localStorage
    const scoreboard: Score[] = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    // Add the new result with moves and time and score
    scoreboard.push({ winnerName, moves, time, score: finalScore });

    // Sort by score (ascending order)
    scoreboard.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );

    // Only save the top 10 scores
    const topScores = scoreboard.slice(0, 10);

    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(topScores));
  }

  public static getScoreboard(isPvP: boolean, isDifficulty?: number): Score[] {
    // Determine the appropriate storage key based on game type and difficulty
    const storageKey = isPvP
      ? this.PVP_STORAGE_KEY
      : isDifficulty === 2
      ? this.PVE_STORAGE_KEY_HARD
      : this.PVE_STORAGE_KEY_EASY;

    // Return the parsed scoreboard
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  }

  public static clearScoreboard(): void {
    localStorage.removeItem(this.PVP_STORAGE_KEY);
    localStorage.removeItem(this.PVE_STORAGE_KEY_EASY);
    localStorage.removeItem(this.PVE_STORAGE_KEY_HARD);
  }
}
