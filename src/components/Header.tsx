import { avatar } from '../assets';
import { Player } from '../classes/Player';

type Props = {
  players: Player[];
};

const Header = (props: Props) => {
  return (
    <div className="flex justify-around items-center p-4 bg-slate-500 text-white">
      <h1 className="text-4xl">Connect 4</h1>
      <div className="flex-col flex gap-2 text-xl">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            width={30}
            height={30}
            alt="X"
            className="rounded-full border-2 border-slate-200"
          />
          {props.players[0].name}
        </div>
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            width={30}
            height={30}
            alt="X"
            className="rounded-full border-2 border-slate-200"
          />
          <p>{props.players[1].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
