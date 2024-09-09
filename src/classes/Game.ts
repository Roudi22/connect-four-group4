import { Board } from './Board';
import { Player, PlayerSymbol } from './Player';
import { WinChecker } from './WinChecker';
import { ScoreboardLocalStorage } from './scoreboardLocalstorage';

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  private movesCount: { [key: string]: number }; // Tracks moves for each player

  // Time tracking variables
  private startTime: number; // The time when the current player's turn started
  private timeSpent: { [key: string]: number }; // Tracks time spent by each player in seconds

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.movesCount = { X: 0, O: 0 }; // Initialize move counts
    this.startTime = Date.now(); // Start time for the first player
    this.timeSpent = { X: 0, O: 0 }; // Initialize time spent
  }

  public playTurn(col: number): boolean {
    if (this.winner) return false;

    const currentPlayer = this.players[this.currentPlayerIndex];
    const lastMove = this.board.makeMove(col, currentPlayer.symbol);

    if (lastMove.x < 0 || lastMove.y < 0) return false;

    // Increment move count for the current player
    this.movesCount[currentPlayer.symbol]++;

    // Calculate and add time spent by current player
    const currentTime = Date.now();
    this.timeSpent[currentPlayer.symbol] += Math.floor(
      (currentTime - this.startTime) / 1000
    );
    this.startTime = currentTime; // Reset start time for the next player

    if (WinChecker.checkForWin(lastMove, this.board.getGrid())) {
      this.winner = currentPlayer;

      // Save the score to localStorage when the game ends
      ScoreboardLocalStorage.saveScore(
        currentPlayer.name,
        this.movesCount[currentPlayer.symbol],
        this.timeSpent[currentPlayer.symbol]
      );
    } else if (this.board.isFull()) {
      this.winner = null; // It's a draw
    } else {
      this.switchPlayer();
      if (this.players[this.currentPlayerIndex].isAI) {
        this.playAITurn();
        //this.dumbAI();
      }
    }
    return true;
  }

  private playAITurn(): void {
    const aiPlayer = this.players[this.currentPlayerIndex];
    const opponentPlayer = this.players[1 - this.currentPlayerIndex];

    // 1. Check if AI can win on this move
    let col = this.findWinningMove(aiPlayer.symbol);
    if (col !== null) {
      this.playTurn(col);
      return;
    }

    // 2. Check if opponent can win next move, block it
    col = this.findWinningMove(opponentPlayer.symbol);
    if (col !== null) {
      this.playTurn(col);
      return;
    }

    // 3. If no immediate win or block, choose a random available column
    const availableCols = this.getAvailableColumns();
    if (availableCols.length > 0) {
      col = availableCols[Math.floor(Math.random() * availableCols.length)];
      this.playTurn(col);
    }
  }

  private dumbAI(): void {
    const availableCols = this.getAvailableColumns();
    if (availableCols.length > 0) {
      const randomCol =
        availableCols[Math.floor(Math.random() * availableCols.length)];
      this.playTurn(randomCol);
    }
  }

  private findWinningMove(symbol: PlayerSymbol): number | null {
    for (let col = 0; col < this.board.getGrid()[0].length; col++) {
      if (
        WinChecker.checkForWin(
          this.board.makeMove(col, symbol),
          this.board.getGrid()
        )
      ) {
        this.board.undoMove(col); // Undo the move to keep the board state
        return col;
      }
      this.board.undoMove(col); // Undo the move to keep the board state
    }
    return null;
  }

  private getAvailableColumns(): number[] {
    const availableCols: number[] = [];
    for (let col = 0; col < this.board.getGrid()[0].length; col++) {
      if (this.board.getGrid()[0][col] === '') {
        availableCols.push(col);
      }
    }
    return availableCols;
  }

  private switchPlayer(): void {
    // Switch the current player and update start time
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.startTime = Date.now(); // Set the start time for the new player
  }

  public getTimeSpent(): { [key: string]: number } {
    return this.timeSpent;
  }

  public getMovesCount(): { [key: string]: number } {
    return this.movesCount;
  }

  public getBoard(): string[][] {
    return this.board.getGrid();
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
}
