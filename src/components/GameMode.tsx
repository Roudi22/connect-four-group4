import { useState } from 'react';
import { AIPlayer } from '../classes/AIPlayer';
import { HumanPlayer, Player, SignedInPlayer } from '../classes/Player';

type GameModeProps = {
  onSubmit: (player1: Player, player2: Player) => void;
  signOut: (player: 1 | 2) => void;
  signedIn1: SignedInPlayer | null;
  signedIn2: SignedInPlayer | null;
};

type GameMode =
  | 'Human vs Human'
  | 'Human vs AI'
  | 'AI vs AI'
  | 'Sign In'
  | 'Register';

const minNameLength = 3;
const maxNameLength = 20;

const GameMode = ({
  onSubmit,
  signOut,
  signedIn1,
  signedIn2,
}: GameModeProps) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('Human vs Human');
  const [signInPlayer, setSignInPlayer] = useState(0);
  const [player1Difficulty, setPlayer1Difficulty] = useState(1);
  const [player2Difficulty, setPlayer2Difficulty] = useState(1);
  const [player1Name, setPlayer1Name] = useState<string>(signedIn1?.name || '');
  const [player2Name, setPlayer2Name] = useState<string>(signedIn2?.name || '');

  function goToSignInForPlayer(player: 1 | 2) {
    setSignInPlayer(player);
    setSelectedMode('Sign In');
  }

  async function handleSignIn() {
    console.log(signInPlayer);
  }

  async function handleRegister() {}

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const player1 =
      selectedMode === 'AI vs AI'
        ? new AIPlayer(player1Difficulty, 'X')
        : signedIn1 || new HumanPlayer(player1Name.trim(), 'X');
    const player2 =
      selectedMode === 'Human vs Human'
        ? signedIn2 || new HumanPlayer(player2Name.trim(), 'O')
        : new AIPlayer(player2Difficulty, 'O');

    onSubmit(player1, player2);

    // Reset form
    setSelectedMode('Human vs Human');
    setPlayer1Difficulty(1);
    setPlayer2Difficulty(1);
    setPlayer1Name('');
    setPlayer2Name('');
  }

  // Function to handle image upload
  async function handleImageUpload(
    player: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const imageFile = event.target.files?.[0] || null;

    if (!imageFile) return console.error('Invalid image');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === 'string') {
        const response = await fetch('/api/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ player, encodedImage: base64Image }),
        });

        if (response.ok) {
          // NOTE: in the future we can attach image to a specific player
          const data = await response.json();
          console.log('Image uploaded successfully:', data);
        } else {
          console.error('Image upload failed');
        }
      }
    };
    reader.readAsDataURL(imageFile);
  }

  const renderAIOptions = (player: 1 | 2) => {
    const getter = player === 1 ? player1Difficulty : player2Difficulty;
    const setter = player === 1 ? setPlayer1Difficulty : setPlayer2Difficulty;

    return (
      <>
        <label
          className={`cursor-pointer p-2 border rounded-md ${
            getter === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Trivial
          <input
            type="radio"
            id={`aiVeryEasy${player}`}
            name={`aiVeryEasy${player}`}
            value={1}
            checked={getter === 1}
            onChange={(e) => setter(parseInt(e.target.value))}
            className="hidden"
          />
        </label>
        <label
          className={`cursor-pointer p-2 border rounded-md ${
            getter === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Easy
          <input
            type="radio"
            id={`aiVeryEasy${player}`}
            name={`aiVeryEasy${player}`}
            value={2}
            checked={getter === 2}
            onChange={(e) => setter(parseInt(e.target.value))}
            className="hidden"
          />
        </label>
        <label
          className={`cursor-pointer p-2 border rounded-md ${
            getter === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Medium
          <input
            type="radio"
            id={`aiMedium{player}`}
            name={`aiMedium{player}`}
            value={3}
            checked={getter === 3}
            onChange={(e) => setter(parseInt(e.target.value))}
            className="hidden"
          />
        </label>
      </>
    );
  };

  return (
    <div>
      <h1 className="text-center p-1 md:p-4 text-xl">Choose Game Mode</h1>
      <div className="flex justify-around max-sm:flex-col max-sm:items-center max-sm:gap-4">
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
        <div className="rounded-s-md p-1">
          <input
            type="radio"
            id="register"
            name="gameMode"
            value="Register"
            checked={selectedMode === 'Register'}
            onChange={(e) => setSelectedMode(e.target.value as GameMode)}
            className="hidden"
          />
          <label
            htmlFor="register"
            className={`cursor-pointer p-2 border rounded-md ${
              selectedMode === 'Register'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Register
          </label>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 flex-col bg-white p-1 md:p-4 rounded-lg"
      >
        <div
          className={`transition-all duration-1000 ${
            selectedMode === 'Human vs Human'
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {selectedMode === 'Human vs Human' && (
            <div className="rounded-s-md p-1 md:p-8 flex flex-col gap-1">
              <input
                type="text"
                placeholder="Player 1 Name"
                minLength={minNameLength}
                maxLength={maxNameLength}
                value={player1Name}
                disabled={signedIn1 !== null}
                required
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="border p-2 rounded-md outline-none"
              />
              {signedIn1 ? (
                <div className="flex items-center">
                  <button
                    className="cursor-pointer p-2 border rounded-md bg-gray-200"
                    onClick={() => signOut(1)}
                  >
                    Sign Out
                  </button>
                  <label className="block p-1 text-sm font-medium text-gray-900">
                    Player 1 Image
                    <input
                      className="block w-full p-1 text-xs border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      id="player1img"
                      type="file"
                      onChange={(e) => handleImageUpload(1, e)}
                    />
                  </label>
                </div>
              ) : (
                <button
                  className="cursor-pointer p-2 border rounded-md bg-gray-200"
                  onClick={() => goToSignInForPlayer(1)}
                >
                  Sign In Player 1
                </button>
              )}
              <input
                type="text"
                placeholder="Player 2 Name"
                minLength={minNameLength}
                maxLength={maxNameLength}
                value={player2Name}
                required
                disabled={signedIn2 !== null}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="border p-2 rounded-md outline-none"
              />
              {signedIn2 ? (
                <div className="flex items-center">
                  <button
                    className="cursor-pointer p-2 border rounded-md bg-gray-200"
                    onClick={() => signOut(2)}
                  >
                    Sign Out
                  </button>
                  <label className="block p-1 text-sm font-medium text-gray-900">
                    Player 2 Image
                    <input
                      className="block w-full p-1 text-xs border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      id="player2img"
                      type="file"
                      onChange={(e) => handleImageUpload(2, e)}
                    />
                  </label>
                </div>
              ) : (
                <button
                  className="cursor-pointer p-2 border rounded-md bg-gray-200"
                  onClick={() => goToSignInForPlayer(2)}
                >
                  Sign In Player 2
                </button>
              )}
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
            <div className="rounded-s-md p-1 md:p-8 flex flex-col gap-2 items-center justify-center">
              <input
                type="text"
                className="border p-2 rounded-md outline-none w-full"
                placeholder="Enter Player Name"
                minLength={minNameLength}
                maxLength={maxNameLength}
                value={player1Name}
                required
                disabled={signedIn1 !== null}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
              {signedIn1 ? (
                <div className="flex items-center">
                  <button
                    className="cursor-pointer p-2 border rounded-md bg-gray-200"
                    onClick={() => signOut(1)}
                  >
                    Sign Out
                  </button>
                  <label className="block p-1 text-sm font-medium text-gray-900">
                    Player 1 Image
                    <input
                      className="block w-full p-1 text-xs border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                      id="player1img"
                      type="file"
                      onChange={(e) => handleImageUpload(1, e)}
                    />
                  </label>
                </div>
              ) : (
                <button
                  className="cursor-pointer p-2 border rounded-md bg-gray-200"
                  onClick={() => goToSignInForPlayer(1)}
                >
                  Sign In
                </button>
              )}
              <div className="flex gap-2">{renderAIOptions(2)}</div>
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
            <div className="rounded-s-md p-1 md:p-8 flex flex-col items-center gap-4">
              <div className="flex gap-2 items-center rounded-s-md p-1">
                <span>AI Player 1</span>
                {renderAIOptions(1)}
              </div>
              <div className="flex gap-2 items-center rounded-s-md p-1">
                <span>AI Player 2</span>
                {renderAIOptions(2)}
              </div>
            </div>
          )}
        </div>
        {selectedMode !== 'Register' && selectedMode !== 'Sign In' && (
          <div className="flex space-x-4">
            <button
              type="submit"
              className="rounded-md grow bg-gray-800 text-white text-xl p-2 hover:bg-gray-700"
            >
              Play
            </button>
          </div>
        )}
      </form>
      <>
        <div
          className={`transition-all duration-500 ${
            selectedMode === 'Sign In'
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {selectedMode === 'Sign In' && (
            <form
              onSubmit={handleSignIn}
              className="rounded-s-md p-1 md:p-8 flex flex-col items-center gap-4"
            >
              <div className="flex gap-2 items-center rounded-s-md p-1">
                Sign In
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="rounded-md grow bg-gray-800 text-white text-xl p-2 hover:bg-gray-700"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
        <div
          className={`transition-all duration-500 ${
            selectedMode === 'Register'
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {selectedMode === 'Register' && (
            <form
              onSubmit={handleRegister}
              className="rounded-s-md p-1 md:p-8 flex flex-col items-center gap-4"
            >
              <div className="flex gap-2 items-center rounded-s-md p-1">
                Register
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="rounded-md grow bg-gray-800 text-white text-xl p-2 hover:bg-gray-700"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </>
    </div>
  );
};

export default GameMode;
