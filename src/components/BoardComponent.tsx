import React from 'react';

interface BoardComponentProps {
  grid: string[][];
  onCellClick: (col: number) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  grid,
  onCellClick,
}) => {
  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => onCellClick(colIndex)}
            >
              <div className="p-4">
                {cell === 'X' && (
                  <div className="w-[40px] rounded-full  h-[40px] bg-red-500"></div>
                )}
                {cell === 'O' && (
                  <div className="w-[40px] rounded-full h-[40px] bg-yellow-500"></div>
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
