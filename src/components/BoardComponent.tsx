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
    const newAnimatedCells = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell && !animatedCells[rowIndex][colIndex]) {
          return cell; // Mark cell to be animated
        }
        return animatedCells[rowIndex][colIndex];
      })
    );
    setAnimatedCells(newAnimatedCells);
  }, [grid]);

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
