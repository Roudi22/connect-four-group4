export class ScoreboardLocalStorage {
  private static readonly PVP_STORAGE_KEY = 'connect4PvPScoreboard';
  private static readonly PVE_STORAGE_KEY = 'connect4PvEScoreboard';

  public static saveScore(
    winnerName: string,
    moves: number,
    time: number,
    finalScore: number,
    isPvP: boolean // Determine if it's PvP or PvE
  ): void {
    const storageKey = isPvP ? this.PVP_STORAGE_KEY : this.PVE_STORAGE_KEY;

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

  public static getScoreboard(isPvP: boolean): {
    winnerName: string;
    moves: number;
    time: number;
    score: number;
  }[] {
    const storageKey = isPvP ? this.PVP_STORAGE_KEY : this.PVE_STORAGE_KEY;
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  }
}
