import { useState } from 'react';
import { Game } from './classes/Game';
import { Player } from './classes/Player';
import Header from './components/Header';
import BoardComponent from './components/BoardComponent';

function App() {
  const [player1Name, setPlayer1Name] = useState(new Player('Player 1', 'X'));
  const [player2Name, setPlayer2Name] = useState(new Player('Player 2', 'O'));
  const [game, setGame] = useState(new Game(player1Name, player2Name));
  const [grid, setGrid] = useState(game.getBoard());
  const [message, setMessage] = useState('');

  return (
    <>
      <Header
        players={[player1Name || 'Player 1', player2Name || 'Player 2']}
      />
      <BoardComponent grid={grid} onCellClick={() => {}} />
    </>
  );
}

export default App;
