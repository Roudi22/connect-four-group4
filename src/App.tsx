import { useState } from 'react';

import { BoardGrid } from './classes/Board';
import { WinChecker } from './classes/WinChecker';
import Header from './components/Header';

const mockBoard = [
  ['', '', '', '', '', ''],
  ['X', '', '', '', '', 'X'],
  ['X', '', '', '', 'X', ''],
  ['X', '', '', 'X', '', ''],
  ['X', 'X', 'X', 'X', 'X', 'X'],
] as BoardGrid;

const mockWins = {
  up: { x: 0, y: 3 },
  left: { x: 4, y: 4 },
  diag: { x: 5, y: 1 },
};

function App() {
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  console.log(WinChecker.checkForWin(mockWins.up, mockBoard));
  console.log(WinChecker.checkForWin(mockWins.left, mockBoard));
  console.log(WinChecker.checkForWin(mockWins.diag, mockBoard));

  return (
    <>
      <Header players={players} />
    </>
  );
}

export default App;
