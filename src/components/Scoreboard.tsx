// components/Scoreboard.tsx
import React, { useEffect, useState } from 'react';
import { getScoreboardFromLocalStorage } from '../utils/scoreboardLocalstorage';

const Scoreboard: React.FC = () => {
  const [scores, setScores] = useState<{ winnerName: string; moves: number }[]>(
    []
  );

  useEffect(() => {
    const fetchedScores = getScoreboardFromLocalStorage();
    setScores(fetchedScores);
  }, []);

  if (scores.length === 0) {
    return <div>No scores yet.</div>;
  }

  return (
    <div>
      <h2>Top 5 Scores (Least Moves First)</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {index + 1}. {score.winnerName} - {score.moves} moves
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
