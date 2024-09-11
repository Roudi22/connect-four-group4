import React, { useEffect, useState } from 'react';
import { ScoreboardLocalStorage } from '../classes/scoreboardLocalstorage';

interface ScoreboardProps {
  scoreUpdated: boolean; // Prop to trigger updates
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scoreUpdated }) => {
  // State to hold the list of scores
  const [pvpScores, setPvPScores] = useState<
    {
      winnerName: string;
      moves: number;
      time: number;
      score: number;
    }[]
  >([]);
  const [pveScoresEasy, setPvEScoresEasy] = useState<
    {
      winnerName: string;
      moves: number;
      time: number;
      score: number;
    }[]
  >([]);
  const [pveScoresHard, setPvEScoresHard] = useState<
    {
      winnerName: string;
      moves: number;
      time: number;
      score: number;
    }[]
  >([]);

  // Effect hook to fetch scores from local storage
  useEffect(() => {
    const fetchedPvPScores = ScoreboardLocalStorage.getScoreboard(true);
    const fetchedPvEScoresEasy = ScoreboardLocalStorage.getScoreboard(false, 1);
    const fetchedPvEScoresHard = ScoreboardLocalStorage.getScoreboard(false, 2);
    setPvPScores(fetchedPvPScores);
    setPvEScoresEasy(fetchedPvEScoresEasy);
    setPvEScoresHard(fetchedPvEScoresHard);
  }, [scoreUpdated]);

  return (
    <section className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
      <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
        Top Scores
      </h2>
      {/* PvP Scores */}
      <h3 className="text-xl md:text-2xl font-semibold pt-4 pb-2 text-center">
        Player vs Player Scores
      </h3>
      {pvpScores.length === 0 ? (
        <p>No PvP scores yet.</p>
      ) : (
        <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Rank
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Winner
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Moves
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Time (s)
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {pvpScores.map((score, index) => (
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
                  {score.time} <span className="hidden md:inline">seconds</span>
                </td>
                <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                  {score.score} <span className="hidden md:inline">points</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* PvE Easy Scores */}
      <h3 className="text-xl md:text-2xl font-semibold pt-4 pb-2 text-center">
        Player vs AI (Easy) Scores
      </h3>
      {pveScoresEasy.length === 0 ? (
        <p>No PvE Easy scores yet.</p>
      ) : (
        <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Rank
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Winner
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Moves
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Time (s)
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {pveScoresEasy.map((score, index) => (
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
                  {score.time} <span className="hidden md:inline">seconds</span>
                </td>
                <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                  {score.score} <span className="hidden md:inline">points</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* PvE Hard Scores */}
      <h3 className="text-xl md:text-2xl font-semibold pt-4 pb-2 text-center">
        Player vs AI (Hard) Scores
      </h3>
      {pveScoresHard.length === 0 ? (
        <p>No PvE Hard scores yet.</p>
      ) : (
        <table className="table-auto border-collapse border outline outline-3 outline-gray-400 border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Rank
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Winner
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Moves
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Time (s)
              </th>
              <th className="border border-gray-300 px-1 md:px-4 md:py-2">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {pveScoresHard.map((score, index) => (
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
                  {score.time} <span className="hidden md:inline">seconds</span>
                </td>
                <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
                  {score.score} <span className="hidden md:inline">points</span>
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
