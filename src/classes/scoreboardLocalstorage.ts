export class ScoreboardLocalStorage {
  private static readonly STORAGE_KEY = 'connect4Scoreboard';

  public static saveScore(winnerName: string, moves: number): void {
    // Get the current scoreboard from localStorage
    let scoreboard = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Add the new result
    scoreboard.push({ winnerName, moves });

    // Sort by moves (ascending order)
    scoreboard.sort(
      (a: { moves: number }, b: { moves: number }) => a.moves - b.moves
    );

    // Only save the top 5 scores
    scoreboard = scoreboard.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scoreboard));
  }

  public static getScoreboard(): { winnerName: string; moves: number }[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}
