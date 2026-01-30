export type Block = { color: string } | null;

interface Position {
  x: number;
  y: number;
}

export default class Tetromino {
  public blocks: Block[][];
  public position: Position;

  constructor(color: string, shape: boolean[][]) {
    this.blocks = shape.map((line) => {
      return line.map((blockB) => {
        if (!blockB) return null;

        return {
          color: color,
        } as Block;
      }) as Block[];
    });

    this.position = { x: 0, y: 0 };
  }
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

export function randomTetromino(): Tetromino {
  const pieces = [straightPiece, squarePiece, tPiece, lPiece, sPiece, zPiece];
  return pieces[Math.floor(Math.random() * pieces.length)];
}
