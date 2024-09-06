export const saveScoreToLocalStorage = (winnerName: string, moves: number) => {
  // Get the current scoreboard from localStorage
  let scoreboard = JSON.parse(
    localStorage.getItem('connect4Scoreboard') || '[]'
  );

  // Add the new result
  scoreboard.push({ winnerName, moves });

  // Sort by moves (ascending order)
  scoreboard.sort(
    (a: { moves: number }, b: { moves: number }) => a.moves - b.moves
  );

  // Only save the top 5 scores
  scoreboard = scoreboard.slice(0, 5);

  // Save back to localStorage
  localStorage.setItem('connect4Scoreboard', JSON.stringify(scoreboard));
};

export const getScoreboardFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('connect4Scoreboard') || '[]');
};
