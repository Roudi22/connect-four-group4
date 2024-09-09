import { useState } from 'react';
import { Player } from '../classes/Player';

type GameModeProps = {
  onSubmit: (player1: Player, player2: Player) => void;
};

const GameModePopup = ({ onSubmit }: GameModeProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('Easy');
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!player1Name.trim()) {
      return;
    }
    if (selectedMode === 'Human vs Human' && !player2Name.trim()) {
      return;
    }
    const isAI = selectedMode === 'Human vs AI';
    onSubmit(player1Name, isAI ? 'AI' : player2Name, isAI);
    // Reset form
    setSelectedMode('');
    setPlayer1Name('');
    setPlayer2Name('');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="flex-wrap">
          <h1 className="text-center p-4 text-xl">Choose Game Mode</h1>
          <div className="flex justify-around my-4">
            <div className="rounded-s-md p-1">
              <input
                type="radio"
                id="humanVsHuman"
                name="gameMode"
                value="Human vs Human"
                checked={selectedMode === 'Human vs Human'}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="hidden"
              />
              <label
                htmlFor="humanVsHuman"
                className={`cursor-pointer p-2 border rounded-md ${
                  selectedMode === 'Human vs Human'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Human vs Human
              </label>
            </div>
            <div className="rounded-s-md p-1">
              <input
                type="radio"
                id="humanVsComputer"
                name="gameMode"
                value="Human vs AI"
                checked={selectedMode === 'Human vs AI'}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="hidden"
              />
              <label
                htmlFor="humanVsComputer"
                className={`cursor-pointer p-2 border rounded-md ${
                  selectedMode === 'Human vs AI'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                Human vs AI
              </label>
            </div>
            <div className="rounded-s-md p-1">
              <input
                type="radio"
                id="aiVsAi"
                name="gameMode"
                value="AI vs AI"
                checked={selectedMode === 'AI vs AI'}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="hidden"
              />
              <label
                htmlFor="aiVsAi"
                className={`cursor-pointer p-2 border rounded-md ${
                  selectedMode === 'AI vs AI'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                AI vs AI
              </label>
            </div>
          </div>
          <div
            className={`transition-all duration-1000 ${
              selectedMode === 'Human vs Human'
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {selectedMode === 'Human vs Human' && (
              <div className="rounded-s-md p-8 flex gap-4">
                <input
                  type="text"
                  placeholder="Enter Player 1 Name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="border p-2 rounded-md outline-none"
                />
                <input
                  type="text"
                  placeholder="Player 2 Name"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="border p-2 rounded-md outline-none"
                />
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-500 ${
              selectedMode === 'Human vs AI'
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {selectedMode === 'Human vs AI' && (
              <div className="rounded-s-md p-8 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-2">
                  <div className="rounded-s-md p-1">
                    <input
                      type="radio"
                      id="easy"
                      name="gameDifficulty"
                      value="Easy"
                      checked={difficulty === 'Easy'}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="easy"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        difficulty === 'Easy'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Easy
                    </label>
                  </div>

                  <div className="rounded-s-md p-1">
                    <input
                      type="radio"
                      id="hard"
                      name="gameDifficulty"
                      value="Hard"
                      checked={difficulty === 'Hard'}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="hard"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        difficulty === 'Hard'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Hard
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  className="border p-2 rounded-md outline-none"
                  placeholder="Enter Player Name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="rounded-md grow bg-slate-700 text-white text-xl p-2 hover:bg-slate-400"
            >
              Play
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameModePopup;
