import { useEffect, useState } from 'react';

import { Game } from './classes/Game';
import { AIPlayer, HumanPlayer } from './classes/Player';
import BoardComponent from './components/BoardComponent';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';

// NOTE: Mock players until we have a working popup
// const playerX = new HumanPlayer('Player 1', 'X');
const playerX = new AIPlayer(1, 'X');
const playerO = new HumanPlayer('Player 2', 'O');
// const playerO = new AIPlayer(1, 'O');

// NOTE: Needs a reset game function or non const variable so we can make a new instance on a new game
const game = new Game(playerX, playerO);

function App() {
  const [grid, setGrid] = useState(game.getGrid());
  const [message, setMessage] = useState(
    `${game.getCurrentPlayer().name}'s turn`
  );

  const updateUi = () => {
    setMessage(
      game.winner
        ? `${game.winner.name} wins!`
        : `${game.getCurrentPlayer().name}'s turn`
    );
    setGrid([...game.getGrid()]);
  };

  // FIX: player two always starts
  const nextTurn = () => {
    const gameOver = game.moveToNextTurn();
    updateUi();

    const currentPlayer = game.getCurrentPlayer();
    if (gameOver || currentPlayer instanceof HumanPlayer) return;

    const board = game.getBoard();
    board.makeMove(currentPlayer.playTurn(board), currentPlayer.symbol);
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
    if (currentPlayer instanceof AIPlayer) return;

    const board = game.getBoard();
    const validMove = currentPlayer.playTurn(board, col);
    if (!validMove) return;
    nextTurn();
  };

  return (
    <>
      <Header players={[playerX || 'Player 1', playerO || 'Player 2']} />
      <GameStatus message={message} />
      <BoardComponent grid={grid} onCellClick={handleCellClick} />

      <Scoreboard />
    </>
  );
}

export default App;
