export class WinChecker {
  public static checkForWin(
    symbol: string,
    board: string[][]
  ): { x: number; y: number }[] | false {
    console.log({ symbol, board });
    return false;
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

