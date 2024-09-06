import { useState } from 'react';
import GameModePopup from './components/GameModePopup';
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
  const [showPopup, setShowPopup] = useState(true);

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

  function handleGameModeSubmit(
    player1Name: string,
    player2Name: string,
    isAI: boolean
  ) {
    const player1 = new Player(player1Name || 'Player 1', 'X');
    const player2 = new Player(
      player2Name || (isAI ? 'Computer' : 'Player 2'),
      'O'
    );
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setGame(new Game(player1, player2));
    setGrid(game.getBoard());
    setMessage(`${player1.name}'s playTurn`);
    setShowPopup(false);
  }

  return (
    <>
      <Header players={[player1Name, player2Name]} />
      {showPopup && <GameModePopup onSubmit={handleGameModeSubmit} />}
      <GameStatus message={message} />
      <BoardComponent grid={grid} onCellClick={handleCellClick} />
    </>
  );
}

export default App;
