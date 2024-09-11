import React, { useEffect, useState } from 'react';
import { ScoreboardLocalStorage } from '../classes/scoreboardLocalstorage';

interface ScoreboardProps {
  scoreUpdated: boolean; // Prop to trigger updates
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scoreUpdated }) => {
  // State to hold the list of scores
  const [scores, setScores] = useState<
    { winnerName: string; moves: number; time: number; score: number }[]
  >([]);

  // Effect hook to fetch scores from local storage
  useEffect(() => {
    const fetchedScores = ScoreboardLocalStorage.getScoreboard();
    setScores(fetchedScores);
  }, [scoreUpdated]);

  // If there are no scores, display a message
  if (scores.length === 0) {
    return (
      <section className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
          Top 5 Scores (Least Moves First)
        </h2>
        No scores yet.
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-2xl font-semibold pt-4 pb-2 text-center">
        Top 5 Scores
      </h2>
      {/* Table to display scores */}
      <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="border border-gray-300 px-1 md:px-4 md:py-2">#</th>
            <th className="border border-gray-300 px-1 md:px-4 md:py-2">
              Winner
            </th>
            <th className="border border-gray-300 px-1 md:px-4 md:py-2">
              Moves
            </th>
            <th className="border border-gray-300 px-1 md:px-4 md:py-2">
              Time
            </th>
            <th className="border border-gray-300 px-1 md:px-4 md:py-2">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-1 md:px-4 md:py-2 md:min-w-[150px]">
                {score.winnerName}
              </td>
              <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                {score.moves} <span className="hidden md:inline">moves</span>
              </td>
              <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                {score.time} s<span className="hidden md:inline">econds</span>
              </td>
              <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                {score.score} <span className="hidden md:inline">points</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Scoreboard;
