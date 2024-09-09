import { useState } from 'react';
import { AIPlayer, HumanPlayer, Player } from '../classes/Player';

type GameModeProps = {
  onSubmit: (player1: Player, player2: Player) => void;
};

type GameMode = 'Human vs Human' | 'Human vs AI' | 'AI vs AI';

const minNameLength = 3;

const GameModePopup = ({ onSubmit }: GameModeProps) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('Human vs Human');
  const [player1Difficulty, setPlayer1Difficulty] = useState(1);
  const [player2Difficulty, setPlayer2Difficulty] = useState(1);
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({
      selectedMode,
      player1Difficulty,
      player2Difficulty,
      player1Name,
      player2Name,
    });

    const player1 =
      selectedMode === 'AI vs AI'
        ? new AIPlayer(player1Difficulty, 'X')
        : new HumanPlayer(player1Name.trim(), 'X');
    const player2 =
      selectedMode === 'Human vs Human'
        ? new HumanPlayer(player2Name.trim(), 'O')
        : new AIPlayer(player2Difficulty, 'O');

    onSubmit(player1, player2);
    // Reset form
    setSelectedMode('Human vs Human');
    setPlayer1Difficulty(1);
    setPlayer2Difficulty(1);
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
                onChange={(e) => setSelectedMode(e.target.value as GameMode)}
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
                onChange={(e) => setSelectedMode(e.target.value as GameMode)}
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
                onChange={(e) => setSelectedMode(e.target.value as GameMode)}
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
                  minLength={minNameLength}
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="border p-2 rounded-md outline-none"
                />
                <input
                  type="text"
                  placeholder="Player 2 Name"
                  minLength={minNameLength}
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
                      value={1}
                      checked={player2Difficulty === 1}
                      onChange={(e) => setPlayer2Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="easy"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player2Difficulty === 1
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
                      value={2}
                      checked={player2Difficulty === 2}
                      onChange={(e) => setPlayer2Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="hard"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player2Difficulty === 2
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
                  minLength={minNameLength}
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                />
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-500 ${
              selectedMode === 'AI vs AI'
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {selectedMode === 'AI vs AI' && (
              <div className="rounded-s-md p-8 flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-2">
                  <div className="rounded-s-md p-1">
                    <input
                      type="radio"
                      id="p1easy"
                      name="player1Difficulty"
                      value={1}
                      checked={player1Difficulty === 1}
                      onChange={(e) => setPlayer1Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="p1easy"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player1Difficulty === 1
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
                      id="p1hard"
                      name="player1Difficulty"
                      value={2}
                      checked={player1Difficulty === 2}
                      onChange={(e) => setPlayer1Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="p1hard"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player1Difficulty === 2
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Hard
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="rounded-s-md p-1">
                    <input
                      type="radio"
                      id="p2easy"
                      name="player2Difficulty"
                      value={1}
                      checked={player2Difficulty === 1}
                      onChange={(e) => setPlayer2Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="p2easy"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player2Difficulty === 1
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
                      id="p2hard"
                      name="player2Difficulty"
                      value={2}
                      checked={player2Difficulty === 2}
                      onChange={(e) => setPlayer2Difficulty(+e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor="p2hard"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        player2Difficulty === 2
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      Hard
                    </label>
                  </div>
                </div>
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
