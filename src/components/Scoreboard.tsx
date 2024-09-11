import React, { useEffect, useState } from 'react';
import { ScoreboardLocalStorage } from '../classes/scoreboardLocalstorage';

interface ScoreboardProps {
  scoreUpdated: boolean; // Prop to trigger updates
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scoreUpdated }) => {
  // State to hold the list of scores
  const [pvpScores, setPvPScores] = useState<
    { winnerName: string; moves: number; time: number; score: number }[]
  >([]);
  const [pveScores, setPvEScores] = useState<
    { winnerName: string; moves: number; time: number; score: number }[]
  >([]);

  // Effect hook to fetch scores from local storage
  // Fetch scores for both PvP and PvE
  useEffect(() => {
    const fetchedPvPScores = ScoreboardLocalStorage.getScoreboard(true);
    const fetchedPvEScores = ScoreboardLocalStorage.getScoreboard(false);
    setPvPScores(fetchedPvPScores);
    setPvEScores(fetchedPvEScores);
  }, [scoreUpdated]);


  return (
    <section className="my-12 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-8 text-center">Top Scores</h2>
      {/* PvP Scores */}
      <h3 className="text-xl font-semibold mb-4">Player vs Player Scores</h3>
      {/* If there are no scores, display a message */}
      {pvpScores.length === 0 ? (
        <p>No PvP scores yet.</p>
      ) : (
        <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Rank</th>
              <th className="border border-gray-300 px-4 py-2">Winner</th>
              <th className="border border-gray-300 px-4 py-2">Moves</th>
              <th className="border border-gray-300 px-4 py-2">Time (s)</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {pvpScores.map((score, index) => (
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
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {score.time} seconds
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {score.score} points
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* PvE Scores */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Player vs AI Scores</h3>
      {/* If there are no scores, display a message */}
      {pveScores.length === 0 ? (
        <p>No PvE scores yet.</p>
      ) : (
        <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Rank</th>
              <th className="border border-gray-300 px-4 py-2">Winner</th>
              <th className="border border-gray-300 px-4 py-2">Moves</th>
              <th className="border border-gray-300 px-4 py-2">Time (s)</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {pveScores.map((score, index) => (
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
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {score.time} seconds
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {score.score} points
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Scoreboard;
