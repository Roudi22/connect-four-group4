import { Board } from './Board';
import { Player, PlayerSymbol } from './Player';
import { WinChecker } from './WinChecker';
import { saveScoreToLocalStorage } from '../utils/scoreboardLocalstorage';

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  public winner: Player | null;
  private movesCount: { [key: string]: number }; // Tracks moves for each player

  constructor(player1: Player, player2: Player) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.movesCount = { X: 0, O: 0 }; // Initialize move counts
  }

  public playTurn(col: number): boolean {
    if (this.winner) return false;

    const currentPlayer = this.players[this.currentPlayerIndex];
    const lastMove = this.board.makeMove(col, currentPlayer.symbol);

    if (lastMove.x < 0 || lastMove.y < 0) return false;

    // Increment move count for the current player
    this.movesCount[currentPlayer.symbol]++;

    if (WinChecker.checkForWin(lastMove, this.board.getGrid())) {
      this.winner = currentPlayer;

      // Save the score to localStorage when the game ends
      saveScoreToLocalStorage(
        currentPlayer.name,
        this.movesCount[currentPlayer.symbol]
      );
      
    } else if (this.board.isFull()) {
      this.winner = null; // It's a draw
    } else {
      this.switchPlayer();
      if (this.players[this.currentPlayerIndex].isAI) {
        this.playAITurn();
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
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }

  public getBoard(): string[][] {
    return this.board.getGrid();
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
}
