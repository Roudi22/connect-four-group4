import player1Image from '../../backend/images/player1.jpg';
import player2Image from '../../backend/images/player2.jpg';
import { Player, SignedInPlayer } from '../classes/Player';

interface GameStatusProps {
  message: string;
  currentPlayer: Player;
  gameStarted: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({
  message,
  currentPlayer,
  gameStarted,
}) => {
  const getPlayerImage = () => {
    if (currentPlayer instanceof SignedInPlayer) return currentPlayer.imageUrl;
    return currentPlayer.symbol === 'X' ? player1Image : player2Image;
  };

  return (
    <div className="max-w-[45rem] w-full self-center rounded text-l md:text-xl border text-center p-5 bg-blue-100 flex items-center">
      <div className="flex w-full justify-center items-center gap-4">
        {gameStarted && (
          <img
            src={getPlayerImage()}
            width={50}
            height={50}
            alt={currentPlayer.name}
            className="rounded-full border-2 aspect-square border-slate-200"
          />
        )}
        {message}
      </div>
    </div>
  );
};

export default GameStatus;
