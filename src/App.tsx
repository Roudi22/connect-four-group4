import { useState } from 'react';

import { BoardGrid } from './classes/Board';
import { WinChecker } from './classes/WinChecker';
import Header from './components/Header';

const mockBoard = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', 'X', 'X', 'X', 'X'],
] as BoardGrid;

function App() {
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  console.log(WinChecker.checkForWin('X', mockBoard));

  return (
    <>
      <Header players={players} />
    </>
  );
}

export default App;
