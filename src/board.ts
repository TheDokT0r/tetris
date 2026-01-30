import type Tetromino from "./tetromino";
import { randomTetromino, type Block } from "./tetromino";

export default class Game {
  public board: Block[][];
  public playedPiece: Tetromino;

  constructor(width: number, height: number) {
    const newBoard: Block[][] = [];
    for (let i = 0; i < height; i++) {
      const line: Block[] = [];
      for (let j = 0; j < width; j++) {
        line.push(null);
      }
      newBoard.push(line);
    }
    this.board = newBoard;
    this.playedPiece = randomTetromino();
  }
}
