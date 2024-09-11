// src/App.tsx
import { useState } from 'react';
import { Game } from './classes/Game';
import { AIPlayer, HumanPlayer, Player } from './classes/Player';
import BoardComponent from './components/BoardComponent';
import GameModePopup from './components/GameModePopup';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import Modal from './components/ui/Modal';
import { wait } from './utils/time';
import { ScoreboardLocalStorage } from './classes/scoreboardLocalstorage';

// FIX: don't render app/board until we have selected players for the first time so we don't have to create a fake game?
let game = new Game(new HumanPlayer('', 'X'), new HumanPlayer('', 'O'));

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [grid, setGrid] = useState(game.getGrid());
  const [message, setMessage] = useState('Welcome!');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false); // State to track score updates
  const [currentMode, setCurrentMode] = useState<
    'PvP' | 'PvE Easy' | 'PvE Hard'
  >('PvP'); // Track game mode

  const updateUi = () => {
    setMessage(
      game.winner
        ? `${game.winner.name} wins!`
        : `${game.getCurrentPlayer().name}'s turn`
    );
    setGrid([...game.getGrid()]);
    if (game.winner) {
      setScoreUpdated(true); // Trigger scoreboard refresh
      setShowModal(true);
    } else if (game.isTie()) {
      setMessage("It's a tie!");
      setShowModal(true);
    }
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

  const handleCellClick = (col: number) => {
    const currentPlayer = game.getCurrentPlayer();
    if (game.winner || currentPlayer instanceof AIPlayer) return;

    const board = game.getBoard();
    const validMove = currentPlayer.playTurn(board, col);
    if (!validMove) return;
    nextTurn();
  };

  const resetGame = () => {
    // NOTE: reverse players to change who goes first. Also affects GameStatus, is this wanted behaviour?
    game = new Game(game.players[1], game.players[0]);
    setShowModal(false);
    setModalMessage('');
    setScoreUpdated(false); // Set the scoreUpdated state
    nextTurn();
  };

  // TODO: send player names as props when called from reset game model and only create new player if name changes
  function handleGameModeSubmit(player1: Player, player2: Player) {
    game = new Game(player1, player2);
    // Determine if it is PvP or PvE game based on players
    if (player1 instanceof HumanPlayer && player2 instanceof HumanPlayer) {
      setCurrentMode('PvP');
    } else if (player2 instanceof AIPlayer && player2.difficulty === 1) {
      setCurrentMode('PvE Easy');
    } else if (player2 instanceof AIPlayer && player2.difficulty === 2) {
      setCurrentMode('PvE Hard');
    }
    setShowPopup(false);
    nextTurn();
  }

  const returnToMenu = () => {
    setShowPopup(true);
    setShowModal(false);
    setMessage('Welcome');
    setModalMessage('');
    setScoreUpdated(false);
    setGrid(game.getGrid());
  };

  const handleResetScoreboard = () => {
    ScoreboardLocalStorage.clearScoreboard();
    setModalMessage('Scoreboard has been cleared!');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const isTie = !game.winner && game.isTie();

  return (
    <main className="flex flex-col gap-2 md:gap-6">
      <Header playerNames={game.players.map(({ name }) => name)} />
      {showPopup && <GameModePopup onSubmit={handleGameModeSubmit} />}
      <GameStatus message={message} />
      <BoardComponent
        grid={grid}
        onCellClick={handleCellClick}
        winningConnection={game.winningConnection}
      />
      <Scoreboard scoreUpdated={scoreUpdated} gameMode={currentMode} />
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="flex flex-col gap-4">
          {modalMessage}
          {isTie ? (
            <span className="text-xl text-center font-bold">It's a tie!</span>
          ) : (
            <span className="text-xl text-center font-bold">
              {game.winner?.name} won!
            </span>
          )}
          <button
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            onClick={() => resetGame()}
          >
            Reset game
          </button>
          <button
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            onClick={returnToMenu}
          >
            Return to menu
          </button>
          <button
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            onClick={handleResetScoreboard}
          >
            Clear scoreboard
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
