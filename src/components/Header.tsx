import player1Image from '../../backend/images/player1.jpg';
import player2Image from '../../backend/images/player2.jpg';
import { Player, SignedInPlayer } from '../classes/Player';

type Props = {
  players: Player[];
};

const Header = (props: Props) => {
  const [player1, player2] = props.players;

  const getImage = (player: Player) => {
    if (player instanceof SignedInPlayer) return player.imageUrl;
    return player.symbol === 'X' ? player1Image : player2Image;
  };

  return (
    <div className="flex justify-around items-center px-1 py-2 md:p-4 bg-slate-500 text-white">
      <h1 className="text-2xl md:text-4xl">Connect 4</h1>
      <div className="flex-col flex gap-2 md:text-xl">
        <div className="flex items-center gap-2">
          <img
            src={getImage(player1)}
            width={30}
            height={30}
            alt="Player 1 Avatar"
            className="rounded-full border-2 aspect-square border-slate-200"
          />
          {/* Trims name if its too long */}
          <span className="truncate max-w-[200px]">{player1.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={getImage(player2)}
            width={30}
            height={30}
            alt="Player 2 Avatar"
            className="rounded-full border-2 aspect-square border-slate-200"
          />
          {/* Trims name if its too long */}
          <span className="truncate max-w-[200px]">{player2.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
