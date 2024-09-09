import { useEffect, useState } from 'react';
import { Game } from './classes/Game';
import { AIPlayer, HumanPlayer } from './classes/Player';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import Modal from './components/ui/Modal';
import { wait } from './utils/time';

// NOTE: Mock players until we have a working popup
// const playerX = new HumanPlayer('Player 1', 'X');
const playerX = new AIPlayer(1, 'X');
// const playerO = new HumanPlayer('Player 2', 'O');
const playerO = new AIPlayer(2, 'O');

// NOTE: Needs a reset game function or non const variable so we can make a new instance on a new game
let game = new Game(playerX, playerO);

function App() {
  const [grid, setGrid] = useState(game.getGrid());
  const [message, setMessage] = useState(
    `${game.getCurrentPlayer().name}'s turn`
  );
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateUi = () => {
    setMessage(
      game.winner
        ? `${game.winner.name} wins!`
        : `${game.getCurrentPlayer().name}'s turn`
    );
    setGrid([...game.getGrid()]);
    if (game.winner) setShowModal(true);
  };

  // FIX: player two always starts
  const nextTurn = () => {
    const gameOver = game.moveToNextTurn();
    updateUi();

    const currentPlayer = game.getCurrentPlayer();
    if (gameOver || currentPlayer instanceof HumanPlayer) return;
    playAITurn(currentPlayer);
  };

  const playAITurn = async (player: AIPlayer) => {
    await wait(1500);
    setMessage(`${player.name} is thinking...`);
    await wait(1500);
    const board = game.getBoard();
    board.makeMove(player.playTurn(board), player.symbol);
    nextTurn();
  };

  // NOTE: Hack until we get a real start button
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextTurn();
    }, 10);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = (col: number) => {
    const currentPlayer = game.getCurrentPlayer();
    if (game.winner || currentPlayer instanceof AIPlayer) return;

    const board = game.getBoard();
    const validMove = currentPlayer.playTurn(board, col);
    if (!validMove) return;
    nextTurn();
  };

  const resetGame = () => {
    setIsPlayer1Turn(!isPlayer1Turn);

    const startingPlayer = isPlayer1Turn ? playerO : playerX;
    const secondPlayer = isPlayer1Turn ? playerX : playerO;

    game = new Game(startingPlayer, secondPlayer);
    updateUi();
    setShowModal(false);
    nextTurn();
  };

  return (
    <>
      <Header players={[playerX || 'Player 1', playerO || 'Player 2']} />
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
