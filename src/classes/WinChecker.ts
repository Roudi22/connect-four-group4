import { BoardGrid, BoardLocation } from './Board';

export class WinChecker {
  public static checkForWin(
    lastMove: BoardLocation,
    grid: BoardGrid
  ): BoardLocation[] | false {
    for (const { forward, reverse } of directions) {
      const matchingCells = [
        { ...lastMove },
        ...this.travelGrid(grid, lastMove, forward),
        ...this.travelGrid(grid, lastMove, reverse),
      ];

      // NOTE: can find longer connects than four but not 7 shaped double wins
      if (matchingCells.length >= 4) return matchingCells;
    }

    return false;
  }

  private static travelGrid(
    grid: BoardGrid,
    start: BoardLocation,
    direction: BoardLocation
  ) {
    const symbol = grid[start.y][start.x];
    const matchingCells = [];
    let currentX = start.x + direction.x;
    let currentY = start.y + direction.y;

    while (true) {
      const outOfBounds =
        currentX < 0 ||
        currentY < 0 ||
        currentX >= grid[0].length ||
        currentY >= grid.length;

      if (outOfBounds || grid[currentY][currentX] !== symbol) break;

      matchingCells.push({ x: currentX, y: currentY });
      currentX += direction.x;
      currentY += direction.y;
    }

    return matchingCells;
  }
}

const directions = [
  {
    label: 'upDown',
    forward: { x: 0, y: -1 },
    reverse: { x: 0, y: 1 },
  },
  {
    label: 'nwSe',
    forward: { x: -1, y: -1 },
    reverse: { x: 1, y: 1 },
  },
  {
    label: 'leftRight',
    forward: { x: -1, y: 0 },
    reverse: { x: 1, y: 0 },
  },
  {
    label: 'neSw',
    forward: { x: 1, y: -1 },
    reverse: { x: -1, y: 1 },
  },
];
