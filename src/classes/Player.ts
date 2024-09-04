export class Player {
    public name: string;
    public symbol: string;
    public isAI: boolean;

    constructor(name: string, symbol: string, isAI: boolean = false) {
        this.name = name;
        this.symbol = symbol;
        this.isAI = isAI;
    }
}
