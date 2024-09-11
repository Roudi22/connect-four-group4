import React, { useState, useEffect } from 'react';
import { BoardLocation } from '../classes/Board';

interface BoardComponentProps {
  grid: string[][];
  onCellClick: (col: number) => void;
  winningConnection: BoardLocation[] | null;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  grid,
  onCellClick,
  winningConnection,
}) => {
  const [animatedCells, setAnimatedCells] = useState<(string | null)[][]>(
    grid.map((row) => row.map(() => null))
  );

  useEffect(() => {
    // Skapa en ny 2D-array (grid) baserat på den nuvarande `grid`-prop
    const newAnimatedCells = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        // Kontrollera om en cell har blivit fylld (dvs. den innehåller ett "X" eller "O")
        // och om den cellen inte redan har markerats för animation (`animatedCells[rowIndex][colIndex]` är null)
        if (cell && !animatedCells[rowIndex][colIndex]) {
          return cell; // Markera cellen för animation genom att returnera den nya symbolen ("X" eller "O")
        }
        // Om cellen redan har animerats eller är tom, behåll det tidigare tillståndet
        return animatedCells[rowIndex][colIndex];
      })
    );
    // Uppdatera `animatedCells` med den nya 2D-arrayen som innehåller vilka celler som ska animeras
    setAnimatedCells(newAnimatedCells);
    console.log('animatedCells', animatedCells);
  }, [grid]); // Kör denna effekt varje gång `grid` ändras

  const isWinningCell = (rowIndex: number, colIndex: number) => {
    return (
      winningConnection &&
      winningConnection.some(
        (location) => location.x === colIndex && location.y === rowIndex
      )
    );
  };
  // create a function to check if a column is full
  const isColumnFull = (colIndex: number) => {
    return grid[0][colIndex] !== '';
  };
  return (
    <div className="inline-flex flex-col items-center self-center mt-5 p-1 bg-blue-200 border border-black rounded">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`h-[40px] md:h-[50px] m-1 aspect-square border border-black rounded-full flex items-center justify-center ${
                !isColumnFull(colIndex) && 'cursor-pointer'
              } ${isColumnFull(colIndex) ? 'cursor-not-allowed' : ''} ${
                isWinningCell(rowIndex, colIndex)
                  ? ' cursor-pointer bg-green-500'
                  : ' bg-white'
              }`}
              onClick={() => {
                if (isColumnFull(colIndex)) return;
                onCellClick(colIndex);
                isColumnFull(colIndex);
              }}
            >
              {cell === 'X' && (
                <div
                  className={`h-[80%] rounded-full aspect-square bg-red-500 ${
                    animatedCells[rowIndex][colIndex] ? 'animate-drop' : ''
                  } ${isColumnFull(colIndex) ? 'opacity-50' : ''}`}
                ></div>
              )}
              {cell === 'O' && (
                <div
                  className={`h-[80%] rounded-full aspect-square bg-yellow-500 ${
                    animatedCells[rowIndex][colIndex] ? 'animate-drop' : ''
                  } ${isColumnFull(colIndex) ? 'opacity-50' : ''}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardComponent;
