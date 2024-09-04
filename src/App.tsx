import { useState } from 'react';

import Header from './components/Header';
import { WinChecker } from './classes/WinChecker';

const mockBoard = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', 'X', 'X', 'X', 'X'],
];

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
