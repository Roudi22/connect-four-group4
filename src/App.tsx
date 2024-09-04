import { useState } from 'react';

import Header from './components/Header';

function App() {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  return (
    <>
      <Header
        players={[player1Name || 'Player 1', player2Name || 'Player 2']}
      />
    </>
  );
}

export default App;
