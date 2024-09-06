import { useState } from 'react';

type GameModeProps = {
  onSubmit: (
    player1Name: string,
    player2Name: string,
    isAI: boolean
  ) => void | undefined;
};
const GameModePopup = ({ onSubmit }: GameModeProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
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
    const isAI = selectedMode === 'Human vs Computer';
    onSubmit(player1Name, isAI ? 'Computer' : player2Name, isAI);
    // Reset form
    setSelectedMode('');
    setPlayer1Name('');
    setPlayer2Name('');
  }
  function EndGame() {
    console.log('Gamed Ended');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="flex-wrap ">
          <h1>Choose Game Mode</h1>
          <div className="rounded-s-md p-1">
            <input
              type="radio"
              id="humanVsHuman"
              name="gameMode"
              value="Human vs Human"
              checked={selectedMode === 'Human vs Human'}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            <label htmlFor="humanVsHuman">Human vs Human</label>
          </div>
          <div className="rounded-s-md p-1">
            <input
              type="radio"
              id="humanVsComputer"
              name="gameMode"
              value="Human vs Computer"
              checked={selectedMode === 'Human vs Computer'}
              onChange={(e) => setSelectedMode(e.target.value)}
            />
            <label htmlFor="humanVsComputer">Human vs Computer</label>
          </div>
          {selectedMode === 'Human vs Human' && (
            <div className="rounded-s-md p-8">
              <input
                type="text"
                placeholder="Enter Player 1 Name"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
              <input
                type="text"
                placeholder="Player 2 Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </div>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-16 rounded-md grow bg-slate-900 text-white hover:bg-slate-400"
            >
              Select
            </button>
            <button
              type="button"
              className="w-16 rounded-md grow bg-slate-900 text-white hover:bg-slate-400"
              onClick={EndGame}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameModePopup;
