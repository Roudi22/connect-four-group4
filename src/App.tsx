import GameModePopup from './components/GameModePopup';
import { useEffect, useState } from 'react';
import { Game } from './classes/Game';
import { AIPlayer, HumanPlayer } from './classes/Player';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import Modal from './components/ui/Modal';
import { wait } from './utils/time';

function App() {
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('');
  const [game, setGame] = useState(
    new Game(
      new HumanPlayer(player1Name, 'X'),
      new HumanPlayer(player2Name, 'O')
    )
  );
  const [showPopup, setShowPopup] = useState(true);
  const [grid, setGrid] = useState(game.getGrid());
  const [message, setMessage] = useState(
    `${game.getCurrentPlayer().name}'s turn`
  );
  const [showModal, setShowModal] = useState(false);

  const updateUi = () => {
    setMessage(
      game.winner
        ? `${game.winner.name} wins!`
        : `${game.getCurrentPlayer().name}'s turn`
    );
    console.log('current player', game.getCurrentPlayer());
    setGrid([...game.getGrid()]);
    if (game.winner) setShowModal(true);
  };

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
    setShowModal(false);
    setTimeout(() => {
      setShowPopup(true);
      setPlayer1Name('');
      setPlayer2Name('');
      const newGame = new Game(
        new HumanPlayer(player1Name, 'X'),
        new HumanPlayer(player2Name, 'O')
      );
      setGame(newGame);
      setGrid(newGame.getGrid());
      setMessage('');
    }, 0);
  };

  function handleGameModeSubmit(
    player1Name: HumanPlayer | AIPlayer | undefined,
    player2Name: HumanPlayer | AIPlayer | undefined
  ) {
    setShowPopup(false);
    if (!player1Name || !player2Name) return;
    if (player1Name instanceof AIPlayer && player2Name instanceof AIPlayer) {
      console.log('player1', player1Name);
      setPlayer1Name(`Difficulty ${player1Name.difficulty} AI `);
      setPlayer2Name(`Difficulty ${player2Name.difficulty} AI`);

      updateUi();
      nextTurn();
      const newGame = new Game(player1Name, player2Name);
      setGame(newGame);
      setGrid(newGame.getGrid());
    } else {
      setPlayer1Name(player1Name.name);
      setPlayer2Name(player2Name.name);
      console.log('player1', player1Name);
      updateUi();
      const newGame = new Game(player1Name, player2Name);
      setGame(newGame);
      setGrid(newGame.getGrid());
    }
  }

  return (
    <>
      <Header players={[player1Name, player2Name]} />
      {showPopup && <GameModePopup onSubmit={handleGameModeSubmit} />}
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
