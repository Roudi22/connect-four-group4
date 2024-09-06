import { useEffect, useState } from 'react';

import { Game } from './classes/Game';
import { AIPlayer, HumanPlayer } from './classes/Player';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';
import Header from './components/Header';

// const playerX = new HumanPlayer('Player 1', 'X');
const playerX = new AIPlayer(1, 'X');
const playerO = new HumanPlayer('Player 2', 'O');
const game = new Game(playerX, playerO);

function App() {
  const [grid, setGrid] = useState(game.getGrid());
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(`${game.getCurrentPlayer().name}'s turn`);
      game.play();
      setMessage(`${game.getCurrentPlayer().name}'s turn`);
      setGrid([...game.getGrid()]);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleCellClick = (col: number) => {
    if (game.playTurn(col)) {
      setGrid([...game.getGrid()]);
      if (game.winner) {
        setMessage(`${game.winner.name} wins!`);
      } else {
        setMessage(`${game.getCurrentPlayer().name}'s turn`);
      }
    }
  };
  return (
    <>
      <Header players={[playerX || 'Player 1', playerO || 'Player 2']} />
      <GameStatus message={message} />
      <BoardComponent grid={grid} onCellClick={handleCellClick} />
    </>
  );
}

export default App;
