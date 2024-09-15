import { Player } from '../classes/Player';

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
  return (
    <div className="max-w-[45rem] w-full self-center rounded text-l md:text-xl border text-center p-5 bg-blue-100 flex items-center">
      <div className="flex w-full justify-center items-center gap-4">
        {gameStarted && (
          <img
            src={currentPlayer.image}
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
