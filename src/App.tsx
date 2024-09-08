import { useState } from 'react';

import { Game } from './classes/Game';
import { Player } from './classes/Player';
import Header from './components/Header';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';
import Scoreboard from './components/Scoreboard';
import Modal from './components/ui/Modal';

function App() {
  const [player1Name, setPlayer1Name] = useState(new Player('Player 1', 'X'));
  const [player2Name, setPlayer2Name] = useState(
    new Player('Player 2', 'O', true)
  );
  const [game, setGame] = useState(new Game(player1Name, player2Name));
  const [grid, setGrid] = useState(game.getBoard());
  const [message, setMessage] = useState(
    `${game.getCurrentPlayer().name}'s turn`
  );

  const [isPlayer1Turn, setIsPlayer1Turn] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleCellClick = (col: number) => {
    if (game && game.playTurn(col)) {
      setGrid([...game.getBoard()]);
      if (game.winner) {
        setMessage(`${game.winner.name} wins!`);
        setShowModal(true);
      } else {
        setMessage(`${game.getCurrentPlayer().name}'s turn`);
      }
    }
  };

  const resetGame = () => {
    setIsPlayer1Turn(!isPlayer1Turn);

    const startingPlayer = isPlayer1Turn ? player1Name : player2Name;
    const secondPlayer = isPlayer1Turn ? player2Name : player1Name;

    const newGame = new Game(startingPlayer, secondPlayer);
    setGame(newGame);
    setGrid(newGame.getBoard());
    setMessage(`${newGame.getCurrentPlayer().name}'s turn`);
    setShowModal(false);
  };

  return (
    <>
      <Header
        players={[player1Name || 'Player 1', player2Name || 'Player 2']}
      />
      <GameStatus message={message} />
      <BoardComponent grid={grid} onCellClick={handleCellClick} />
      <Scoreboard />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-4">
          <span className="text-xl text-center font-bold">
            {game.winner?.name} won!
          </span>
          <button
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            onClick={() => resetGame()}
          >
            Reset game
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
