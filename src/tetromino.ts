export type Block = { x: number; y: number; color: string } | null;

export default class Tetromino {
  private blocks: Block[][];

  constructor(color: string, shape: boolean[][]) {
    this.blocks = shape.map((line, i) => {
      return line.map((blockB, j) => {
        if (!blockB) return null;

        return {
          x: j,
          y: i,
          color: color,
        } as Block;
      }) as Block[];
    });
  }
  public getBlocks = () => this.blocks;
}

export const straightPiece = new Tetromino("blue", [
  [true, true, true, true, true],
]);
export const squarePiece = new Tetromino("yellow", [
  [true, true],
  [true, true],
]);

export const tPiece = new Tetromino("pink", [
  [true, true, true],
  [false, true, false],
]);

export const lPiece = new Tetromino("orange", [
  [true, false],
  [true, false],
  [true, true],
]);
export const sPiece = new Tetromino("green", [
  [false, true, true],
  [true, true, false],
]);
export const zPiece = new Tetromino("red", [
  [true, true, false],
  [false, true, true],
]);

export function randomPiece(): Tetromino {
  const pieces = [straightPiece, squarePiece, tPiece, lPiece, sPiece, zPiece];
  return pieces[Math.floor(Math.random() * pieces.length)];
}
