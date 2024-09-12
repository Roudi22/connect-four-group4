import { Board, BoardGrid, BoardLocation } from './Board';
import { PlayerBaseClass, PlayerSymbol } from './Player';
import { directions, WinChecker } from './WinChecker';

export class AIPlayer extends PlayerBaseClass {
  public difficulty;

  constructor(difficulty: number, symbol: PlayerSymbol) {
    super(`Difficulty ${difficulty} AI`, symbol);
    this.difficulty = difficulty;
  }

  public playTurn(board: Board): number {
    if (this.difficulty === 1) return this.dumbAI(board);
    if (this.difficulty === 2) return this.easyAI(board);
    if (this.difficulty === 3) return this.mediumAI(board);

    return this.easyAI(board);
  }

  // Diffculty 1 AI
  private dumbAI(board: Board): number {
    const availableCols = board.getAvailableColumns();
    if (availableCols.length > 0) {
      return availableCols[Math.floor(Math.random() * availableCols.length)];
    }

    // FIX: A full board should not let anyone playTurn
    return 1;
  }

  // Difficulty 2 AI
  private easyAI(board: Board): number {
    const mySymbol = this.symbol;
    const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';

    // 1. Check if AI can win on this move
    let col = this.findWinningMove(mySymbol, board);
    if (col !== null) {
      return col;
    }

    // 2. Check if opponent can win next move, block it
    col = this.findWinningMove(opponentSymbol, board);
    if (col !== null) {
      return col;
    }

    // 3. If no immediate win or block, choose a random available column
    const availableCols = board.getAvailableColumns();
    if (availableCols.length > 0) {
      col = availableCols[Math.floor(Math.random() * availableCols.length)];
      return col;
    }

    // FIX: A full board should not let anyone playTurn
    return 1;
  }

  private findWinningMove(symbol: PlayerSymbol, board: Board): number | null {
    const grid = board.getGrid();

    for (let col = 0; col < grid[0].length; col++) {
      const move = board.makeMove(col, symbol);
      if (move.x < 0 || move.y < 0) continue;
      if (WinChecker.checkForWin(move, grid)) {
        board.undoMove(col); // Undo the move to keep the board state
        return col;
      }
      board.undoMove(col); // Undo the move to keep the board state
    }
    return null;
  }

  // Difficulty 3 AI
  private mediumAI(board: Board) {
    const dropsWithWeight = this.analyzeBoard(board.getGrid());

    // first move
    const totalWeight = dropsWithWeight.reduce(
      (sum, { weight }) => sum + weight,
      0
    );
    if (totalWeight <= 15) return Math.floor(board.getGrid()[0].length / 2);

    // other moves
    return this.calculateNextDrop(dropsWithWeight);
  }

  private analyzeBoard(grid: BoardGrid) {
    const possibleDrops = this.findPossibleDrops(grid);
    return possibleDrops.map((coord) => {
      return {
        col: coord.x,
        weight: this.calculateWeightForDrop(grid, coord),
      };
    });
  }

  private findPossibleDrops(grid: BoardGrid) {
    const nullArray: (number | null)[] = Array(grid[0].length).fill(null);

    const columnDephts = grid.reduce((acc, row, rowIndex) => {
      return acc.map((colDepth, colIndex) => {
        return row[colIndex] === '' ? rowIndex : colDepth;
      });
    }, nullArray);

    return columnDephts
      .filter((col) => col !== null)
      .map((depth, col) => ({ x: col, y: depth }));
  }

  private calculateWeightForDrop(grid: BoardGrid, coord: BoardLocation) {
    let weight = 0;

    for (const { forward, reverse } of directions) {
      weight += this.traverseBoard(grid, coord, forward);
      weight += this.traverseBoard(grid, coord, reverse);
    }

    return weight;
  }

  private traverseBoard(
    grid: BoardGrid,
    start: BoardLocation,
    direction: BoardLocation
  ) {
    const width = grid[0].length;
    const height = grid.length;
    const currentLocation = { ...start };
    let weight = 0;
    let stepsTaken = 0;
    let player: 'X' | 'O' | '' = '';

    while (stepsTaken < 4) {
      currentLocation.x += direction.x;
      currentLocation.y += direction.y;

      if (
        currentLocation.x < 0 ||
        currentLocation.x >= width ||
        currentLocation.y < 0 ||
        currentLocation.y >= height
      )
        break;

      const currentPlayer = grid[currentLocation.y][currentLocation.x];
      if (currentPlayer === '' || (player && player !== currentPlayer)) break;

      player = currentPlayer;
      weight += 5 * ++stepsTaken * stepsTaken;
      if (stepsTaken === 3) weight += 250;
      if (stepsTaken === 2 && currentPlayer === this.symbol) weight += 25;
      if (stepsTaken === 3 && currentPlayer === this.symbol) weight += 5000;
    }

    return weight;
  }

  private calculateNextDrop(
    dropsWithWeight: { col: number; weight: number }[]
  ): number {
    const totalWeight = dropsWithWeight.reduce(
      (sum, term) => sum + term.weight,
      0
    );
    let randomNumber = Math.floor(Math.random() * totalWeight) + 1;

    for (const drop of dropsWithWeight) {
      if (randomNumber <= drop.weight) return drop.col;
      randomNumber -= drop.weight;
    }

    // FIX: Should be be allowed to play a full board
    return 1;
  }
}
