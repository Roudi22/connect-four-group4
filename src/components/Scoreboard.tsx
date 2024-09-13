import React, { useEffect, useState } from 'react';
import { ScoreboardLocalStorage } from '../classes/scoreboardLocalstorage';

interface ScoreboardProps {
  scoreUpdated: boolean;
  gameMode: 'PvP' | 'PvE Easy' | 'PvE Hard';
  onResetScoreboard: (message: string) => void;
}

interface Score {
  winnerName: string;
  moves: number;
  time: number;
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  scoreUpdated,
  gameMode,
  onResetScoreboard,
}) => {
  // State to hold the list of scores
  const [pvpScores, setPvPScores] = useState<Score[]>([]);
  const [pveScoresEasy, setPvEScoresEasy] = useState<Score[]>([]);
  const [pveScoresHard, setPvEScoresHard] = useState<Score[]>([]);

  // Track which scoreboard is currently being displayed
  const [currentScoreboard, setCurrentScoreboard] = useState<
    'PvP' | 'PvE Easy' | 'PvE Hard'
  >(gameMode); // Sets initial state to gameMod

  // Effect hook to fetch scores from local storage
  useEffect(() => {
    const fetchedPvPScores = ScoreboardLocalStorage.getScoreboard(true);
    const fetchedPvEScoresEasy = ScoreboardLocalStorage.getScoreboard(false, 1);
    const fetchedPvEScoresHard = ScoreboardLocalStorage.getScoreboard(false, 2);

    setPvPScores(fetchedPvPScores);
    setPvEScoresEasy(fetchedPvEScoresEasy);
    setPvEScoresHard(fetchedPvEScoresHard);
  }, [scoreUpdated]);

  // When the gameMode changes, update the scoreboard
  useEffect(() => {
    setCurrentScoreboard(gameMode);
  }, [gameMode]);

  // Resets scoreboard with confirmation
  const handleResetScoreboard = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to reset the scoreboard? This action cannot be undone.'
    );

    if (isConfirmed) {
      ScoreboardLocalStorage.clearScoreboard();
      onResetScoreboard('Scoreboard has been cleared!');
      setPvPScores([]);
      setPvEScoresEasy([]);
      setPvEScoresHard([]);
    }
  };

  // Render the correct scoreboard based on the current state
  const renderScores = () => {
    switch (currentScoreboard) {
      case 'PvP':
        return pvpScores.length === 0 ? (
          <p className="text-center text-gray-500">No PvP scores yet.</p>
        ) : (
          <ScoreTable scores={pvpScores} />
        );
      case 'PvE Easy':
        return pveScoresEasy.length === 0 ? (
          <p className="text-center text-gray-500">No PvE Easy scores yet.</p>
        ) : (
          <ScoreTable scores={pveScoresEasy} />
        );
      case 'PvE Hard':
        return pveScoresHard.length === 0 ? (
          <p className="text-center text-gray-500">No PvE Hard scores yet.</p>
        ) : (
          <ScoreTable scores={pveScoresHard} />
        );
      default:
        return null;
    }
  };

  return (
    <section className="scoreboard-container p-4 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Scoreboard (Top 10)
      </h2>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setCurrentScoreboard('PvP')}
          className={`px-4 py-2 rounded-md ${
            currentScoreboard === 'PvP'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Human vs Human
        </button>
        <button
          onClick={() => setCurrentScoreboard('PvE Easy')}
          className={`px-4 py-2 rounded-md ${
            currentScoreboard === 'PvE Easy'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Human vs AI Easy
        </button>
        <button
          onClick={() => setCurrentScoreboard('PvE Hard')}
          className={`px-4 py-2 rounded-md ${
            currentScoreboard === 'PvE Hard'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          Human vs AI Hard
        </button>
      </div>
      <div className="scores-table-container mb-4">{renderScores()}</div>
      <div className="flex justify-center">
        <button
          onClick={handleResetScoreboard}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset Scoreboard
        </button>
      </div>
    </section>
  );
};

const ScoreTable: React.FC<{ scores: Score[] }> = ({ scores }) => (
  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    <thead className="bg-gray-700 text-white">
      <tr>
        <th className="border border-gray-300 px-1 md:px-4 md:py-2">Rank</th>
        {/* Trims name if its too long */}
        <th className="border border-gray-300 px-1 md:px-4 md:py-2 max-w-[100px]">
          Winner
        </th>
        <th className="border border-gray-300 px-1 md:px-4 md:py-2">Moves</th>
        <th className="border border-gray-300 px-1 md:px-4 md:py-2">Time</th>
        <th className="border border-gray-300 px-1 md:px-4 md:py-2">Score</th>
      </tr>
    </thead>
    <tbody>
      {scores.map((score, index) => (
        <tr key={index} className="even:bg-gray-100">
          <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
            {index + 1}
          </td>
          {/* Trims name if its too long */}
          <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center truncate max-w-[100px]">
            {score.winnerName}
          </td>
          <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
            {score.moves}
          </td>
          <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
            {score.time}
          </td>
          <td className="border border-gray-300 px-1 md:px-4 md:py-2 text-center">
            {score.score}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Scoreboard;
