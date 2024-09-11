export class ScoreboardLocalStorage {
  private static readonly PVP_STORAGE_KEY = 'connect4PvPScoreboard';
  private static readonly PVE_STORAGE_KEY_EASY = 'connect4PvEScoreboardEasy'; // difficulty 1
  private static readonly PVE_STORAGE_KEY_HARD = 'connect4PvEScoreboardHARD'; // Use for hard difficulty scoreboard   // difficulty 2

  public static saveScore(
    winnerName: string,
    moves: number,
    time: number,
    finalScore: number,
    isPvP: boolean, // Determine if it's PvP or PvE
    isDifficulty: number
  ): void {
    const storageKey = isPvP
      ? this.PVP_STORAGE_KEY
      : isDifficulty === 2
      ? this.PVE_STORAGE_KEY_HARD
      : this.PVE_STORAGE_KEY_EASY;

    // Get the current scoreboard from localStorage
    let scoreboard = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Add the new result with moves and time and score
    scoreboard.push({ winnerName, moves, time, score: finalScore });

    // Sort by score (ascending order)
    scoreboard.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );

    // Only save the top 5 scores
    scoreboard = scoreboard.slice(0, 20);

    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(scoreboard));
  }

  public static getScoreboard(
    isPvP: boolean,
    isDifficulty?: number
  ): {
    winnerName: string;
    moves: number;
    time: number;
    score: number;
  }[] {
    const storageKey = isPvP
      ? this.PVP_STORAGE_KEY
      : isDifficulty === 2
      ? this.PVE_STORAGE_KEY_HARD
      : this.PVE_STORAGE_KEY_EASY;

    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  }
}
