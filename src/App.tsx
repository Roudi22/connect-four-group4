import { useState } from 'react';

import { Game } from './classes/Game';
import { Player } from './classes/Player';
import Header from './components/Header';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';

function App() {
  const [player1Name, setPlayer1Name] = useState(new Player('Player 1', 'X'));
  const [player2Name, setPlayer2Name] = useState(new Player('Player 2', 'O'));
  const [game, setGame] = useState(new Game(player1Name, player2Name));
  const [grid, setGrid] = useState(game.getBoard());
  const [message, setMessage] = useState('');

  const handleCellClick = (col: number) => {
    if (game && game.playTurn(col)) {
      setGrid([...game.getBoard()]);
      if (game.winner) {
        setMessage(`${game.winner.name} wins!`);
      } else {
        setMessage(`${game.getCurrentPlayer().name}'s turn`);
      }
    }
  };
  return (
    <>
      <Header
        players={[player1Name || 'Player 1', player2Name || 'Player 2']}
      />
      <GameStatus message={message} />
      <BoardComponent grid={grid} onCellClick={handleCellClick} />
    </>
  );
}

export default App;
