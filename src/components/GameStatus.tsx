import React from 'react';

interface GameStatusProps {
  message: string;
}

const GameStatus: React.FC<GameStatusProps> = ({ message }) => {
  return (
    <div className="max-w-[45rem] w-full self-center rounded my-5 text-l md:text-xl border text-center p-5 bg-blue-100">
      {message}
    </div>
  );
};

export default GameStatus;
