export class ScoreboardLocalStorage {
  private static readonly STORAGE_KEY = 'connect4Scoreboard';

  public static saveScore(
    winnerName: string,
    moves: number,
    time: number,
    finalScore: number
  ): void {
    // Get the current scoreboard from localStorage
    let scoreboard = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Add the new result with moves and time and score
    scoreboard.push({ winnerName, moves, time, score: finalScore });

    // Sort by score (ascending order)
    scoreboard.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );

    // Only save the top 5 scores
    scoreboard = scoreboard.slice(0, 20);

    // Save back to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scoreboard));
  }

  public static getScoreboard(): {
    winnerName: string;
    moves: number;
    time: number;
    score: number;
  }[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}
