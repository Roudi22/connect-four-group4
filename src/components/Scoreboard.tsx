import React, { useEffect, useState } from 'react';
import { getScoreboardFromLocalStorage } from '../utils/scoreboardLocalstorage';

const Scoreboard: React.FC = () => {
  // State to hold the list of scores
  const [scores, setScores] = useState<{ winnerName: string; moves: number }[]>(
    []
  );

  // Effect hook to fetch scores from local storage
  useEffect(() => {
    const fetchedScores = getScoreboardFromLocalStorage();
    setScores(fetchedScores);
  }, []);

  // If there are no scores, display a message
  if (scores.length === 0) {
    return (
      <section className="my-12 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Top 5 Scores (Least Moves First)
        </h2>
        No scores yet.
      </section>
    );
  }

  return (
    <section className="my-12 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Top 5 Scores (Least Moves First)
      </h2>
      {/* Table to display scores */}
      <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Winner</th>
            <th className="border border-gray-300 px-4 py-2">Moves</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through scores and create table rows */}
          {scores.map((score, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 min-w-[150px]">
                {score.winnerName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {score.moves} moves
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Scoreboard;
