import React from 'react';

interface GameStatusProps {
  message: string;
}

const GameStatus: React.FC<GameStatusProps> = ({ message }) => {
  return (
    <div className="m-5 text-xl border text-center p-5 bg-blue-100">
      {message}
    </div>
  );
};

export default GameStatus;
