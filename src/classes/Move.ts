import { Player } from './Player';

export class Move {
  constructor(
    public player: Player,
    public column: number
  ) {}
}

