import { useState } from 'react';
import { HumanPlayer, AIPlayer } from '../classes/Player';
type GameModeProps = {
  onSubmit: (
    player1Name?: HumanPlayer | AIPlayer | undefined,
    player2Name?: HumanPlayer | AIPlayer | undefined
  ) => void | undefined;
};

const GameModePopup = ({ onSubmit }: GameModeProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(1);
  const [difficulty2, setDifficulty2] = useState<number>(1);
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Selected Mode:', selectedMode);
    console.log('Player 1 Name:', player1Name);
    console.log('Player 2 Name:', player2Name);
    console.log('Difficulty:', difficulty);
    if (!player1Name.trim()) {
      if (selectedMode === 'AI vs AI') {
        onSubmit(new AIPlayer(difficulty, 'X'), new AIPlayer(difficulty2, 'O'));
      }
    }

    if (selectedMode === 'Human vs Human') {
      if (!player2Name.trim()) {
        return;
      }
      onSubmit(
        new HumanPlayer(player1Name, 'X'),
        new HumanPlayer(player2Name, 'O')
      );
    } else if (selectedMode === 'Human vs AI') {
      if (!difficulty) {
        return;
      }
      onSubmit(
        new HumanPlayer(player1Name, 'X'),
        new AIPlayer(difficulty, 'O')
      );
    }

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
                      value={1}
                      checked={difficulty === 1}
                      onChange={(e) => setDifficulty(parseInt(e.target.value))}
                      className="hidden"
                    />
                    <label
                      htmlFor="easy"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        difficulty === 1
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
                      checked={difficulty === 2}
                      onChange={(e) => setDifficulty(parseInt(e.target.value))}
                      className="hidden"
                    />
                    <label
                      htmlFor="hard"
                      className={`cursor-pointer px-6 py-2 border rounded-md ${
                        difficulty === 2
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
          <div
            className={`transition-all duration-500 ${
              selectedMode === 'AI vs AI'
                ? 'max-h-screen opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            {selectedMode === 'AI vs AI' && (
              <div className="rounded-s-md p-8 flex flex-col items-center gap-4">
                <div className="rounded-s-md p-1">
                  <label htmlFor="" className="mr-2">
                    AI Player 1
                  </label>
                  <input
                    type="radio"
                    id="aiEasy1"
                    name="gameDifficulty"
                    value={1}
                    checked={difficulty === 1}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="hidden"
                  />
                  <label
                    htmlFor="aiEasy1"
                    className={`cursor-pointer p-2 border rounded-md ${
                      difficulty === 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    } mr-2`}
                  >
                    Easy
                  </label>
                  <input
                    type="radio"
                    id="aiHard1"
                    name="gameDifficulty"
                    value={2}
                    checked={difficulty === 2}
                    onChange={(e) => setDifficulty(parseInt(e.target.value))}
                    className="hidden"
                  />
                  <label
                    htmlFor="aiHard1"
                    className={`cursor-pointer p-2 border rounded-md ${
                      difficulty === 2
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Hard
                  </label>
                </div>
                <div className="rounded-s-md p-1">
                  <label htmlFor="aiHard" className="mr-2">
                    AI Player 2
                  </label>
                  <input
                    type="radio"
                    id="aiHard2"
                    name="gameDifficulty"
                    value={2}
                    checked={difficulty === 2}
                    onChange={(e) => setDifficulty2(parseInt(e.target.value))}
                    className="hidden"
                  />

                  <input
                    type="radio"
                    id="aiEasy2"
                    name="gameDifficulty"
                    value={1}
                    checked={difficulty === 1}
                    onChange={(e) => setDifficulty2(parseInt(e.target.value))}
                    className="hidden"
                  />
                  <label
                    htmlFor="aiEasy2"
                    className={`cursor-pointer p-2 border rounded-md ${
                      difficulty2 === 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Easy
                  </label>
                  <label
                    htmlFor="aiHard2"
                    className={`cursor-pointer p-2 border rounded-md ${
                      difficulty2 === 2
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Hard
                  </label>
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
