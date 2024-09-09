export class ScoreboardLocalStorage {
  private static readonly STORAGE_KEY = 'connect4Scoreboard';

  public static saveScore(winnerName: string, moves: number, time: number): void {
    // Get the current scoreboard from localStorage
    let scoreboard = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Add the new result with moves and time
    scoreboard.push({ winnerName, moves, time });

    // Sort by moves (ascending order) and time as a tiebreaker
    scoreboard.sort(
      (
        a: { moves: number; time: number },
        b: { moves: number; time: number }
      ) => a.moves - b.moves || a.time - b.time
    );

    // Only save the top 5 scores
    scoreboard = scoreboard.slice(0, 5);

    // Save back to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scoreboard));
  }

  public static getScoreboard(): {
    winnerName: string;
    moves: number;
    time: number;
  }[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}
