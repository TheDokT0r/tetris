export type Block = { color: string } | null;

export default class Tetromino {
  public blocks: Block[][];
  public position: { x: number; y: number };
  public id: string;

  constructor(id: string, color: string, shape: boolean[][]) {
    this.id = id;
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

export const straightPiece = new Tetromino("stirght", "blue", [[true, true, true, true, true]]);
export const squarePiece = new Tetromino("sqaure", "yellow", [
  [true, true],
  [true, true],
]);
export const tPiece = new Tetromino("T", "pink", [
  [false, true, false],
  [true, true, true],
]);
export const lPiece = new Tetromino("L", "orange", [
  [true, false],
  [true, false],
  [true, true],
]);
export const sPiece = new Tetromino("S", "green", [
  [false, true, true],
  [true, true, false],
]);
export const zPiece = new Tetromino("Z", "red", [
  [true, true, false],
  [false, true, true],
]);

export function randomTetromino(): Tetromino {
  const pieces = [straightPiece, squarePiece, tPiece, lPiece, sPiece, zPiece];
  return { ...pieces[Math.floor(Math.random() * pieces.length)] };
}
