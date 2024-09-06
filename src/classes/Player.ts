export type PlayerSymbol = 'X' | 'O';

export class Player {
  public name: string;
  public symbol: PlayerSymbol;
  public isAI: boolean;

  constructor(name: string, symbol: PlayerSymbol, isAI: boolean = false) {
    this.name = name;
    this.symbol = symbol;
    this.isAI = isAI;
  }
}
