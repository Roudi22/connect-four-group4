import { useState } from 'react';

import Header from './components/Header';

function App() {
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);

  return (
    <>
      <Header players={players} />
    </>
  );
}

export default App;
