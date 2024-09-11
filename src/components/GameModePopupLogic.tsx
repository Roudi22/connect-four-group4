// src/components/GameModePopupLogic.tsx
import React, { useState } from 'react';
import { AIPlayer, HumanPlayer, Player } from '../classes/Player';
import GameModePopupUI from './GameModePopupUI'; // Import the UI component

type GameMode = 'Human vs Human' | 'Human vs AI' | 'AI vs AI';

type GameModePopupLogicProps = {
  onSubmit: (player1: Player, player2: Player) => void;
};

const minNameLength = 3;

const GameModePopupLogic: React.FC<GameModePopupLogicProps> = ({
  onSubmit,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('Human vs Human');
  const [player1Difficulty, setPlayer1Difficulty] = useState(1);
  const [player2Difficulty, setPlayer2Difficulty] = useState(1);
  const [player1Name, setPlayer1Name] = useState<string>('');
  const [player2Name, setPlayer2Name] = useState<string>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const player1 =
      selectedMode === 'AI vs AI'
        ? new AIPlayer(player1Difficulty, 'X')
        : new HumanPlayer(player1Name.trim(), 'X');
    const player2 =
      selectedMode === 'Human vs Human'
        ? new HumanPlayer(player2Name.trim(), 'O')
        : new AIPlayer(player2Difficulty, 'O');

    onSubmit(player1, player2);

    // Reset form
    setSelectedMode('Human vs Human');
    setPlayer1Difficulty(1);
    setPlayer2Difficulty(1);
    setPlayer1Name('');
    setPlayer2Name('');
  }

  return (
    <GameModePopupUI
      selectedMode={selectedMode}
      player1Difficulty={player1Difficulty}
      player2Difficulty={player2Difficulty}
      player1Name={player1Name}
      player2Name={player2Name}
      setSelectedMode={setSelectedMode}
      setPlayer1Difficulty={setPlayer1Difficulty}
      setPlayer2Difficulty={setPlayer2Difficulty}
      setPlayer1Name={setPlayer1Name}
      setPlayer2Name={setPlayer2Name}
      handleSubmit={handleSubmit}
    />
  );
};

export default GameModePopupLogic;
