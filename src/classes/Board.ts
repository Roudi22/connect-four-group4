export class Board {
    private grid: string[][];

    constructor(public rows: number = 6, public cols: number = 7) {
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(''));
    }

    public makeMove(col: number, symbol: string): boolean {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row][col] === '') {
                this.grid[row][col] = symbol;
                return true;
            }
        }
        return false;
    }

    public checkForWin( grid: string[][] ,symbol: string): boolean {
        // Logic to check for a win (horizontal, vertical, diagonal)
        for (const row of grid) {
            for (let col = 0; col <= grid[0].length - 4; col++) {
                if (row.slice(col, col + 4).every(cell => cell === symbol)) {
                    return true;
                }
            }
        }
        return false;
    }

    // In Board class

public undoMove(col: number): void {
    for (let row = 0; row < this.grid.length; row++) {
        if (this.grid[row][col] !== '') {
            this.grid[row][col] = '';
            break;
        }
    }
}

    public isFull(): boolean {
        return this.grid.every(row => row.every(cell => cell !== ''));
    }

    public getGrid(): string[][] {
        return this.grid;
    }
}
