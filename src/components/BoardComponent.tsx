import React, { useState, useEffect } from 'react';

interface BoardComponentProps {
  grid: string[][];
  onCellClick: (col: number) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  grid,
  onCellClick,
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
  }, [grid]); // Kör denna effekt varje gång `grid` ändras

  return (
    <div className="flex flex-col items-center mt-5">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="w-[50px] h-[50px] border border-black flex items-center justify-center cursor-pointer text-[24px] m-1"
              onClick={() => onCellClick(colIndex)}
            >
              <div className="p-4">
                {cell === 'X' && (
                  <div
                    className={`w-[40px] rounded-full h-[40px] bg-red-500 ${
                      animatedCells[rowIndex][colIndex] ? 'animate-drop' : ''
                    }`}
                  ></div>
                )}
                {cell === 'O' && (
                  <div
                    className={`w-[40px] rounded-full h-[40px] bg-yellow-500 ${
                      animatedCells[rowIndex][colIndex] ? 'animate-drop' : ''
                    }`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardComponent;
