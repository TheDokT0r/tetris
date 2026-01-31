import Tetromino from "./tetromino";
import { randomTetromino, type Block } from "./tetromino";

export enum Movement {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ROTATE,
}

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

  public movePiece(direction: Movement) {
    let newPos = this.playedPiece.position;
    const { x, y } = newPos;

    switch (direction) {
      case Movement.RIGHT: {
        newPos = { x: x + 1, y };
        break;
      }
      case Movement.LEFT: {
        newPos = { x: x - 1, y };
        break;
      }
      case Movement.DOWN: {
        newPos = { x, y: y + 1 };
        break;
      }
      case Movement.ROTATE: {
        const rotated = rotateMatrixCW(this.playedPiece.blocks);
        if (this.canPlace(rotated, newPos)) {
          this.playedPiece.blocks = rotated;
        }
        return;
      }
    }

    if (this.canPlace(this.playedPiece.blocks, newPos)) {
      this.playedPiece.position = newPos;
    }
  }

  private canPlace(blocks: Block[][], pos: { x: number; y: number }): boolean {
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[0].length; x++) {
        if (!blocks[y][x]) continue;

        const boardX = pos.x + x;
        const boardY = pos.y + y;

        // walls
        if (boardX < 0 || boardX >= this.board[0].length) {
          return false;
        }

        // floor
        if (boardY >= this.board.length) {
          return false;
        }

        // existing blocks
        if (this.board[boardY]?.[boardX]) {
          return false;
        }
      }
    }
    return true;
  }
}

// Vibe coded function because I can't be bothered
function rotateMatrixCW<T>(matrix: T[][]): T[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result: T[][] = Array.from({ length: cols }, () =>
    Array(rows).fill(null),
  );

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      result[x][rows - 1 - y] = matrix[y][x];
    }
  }

  return result;
}
