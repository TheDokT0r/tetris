import Tetromino from "./tetromino";
import { randomTetromino, type Block } from "./tetromino";

export enum Movement {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ROTATE,
  QUICK_DROP,
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

    // Checks if the piece can no longer go down and locks it in place
    if (
      direction === Movement.DOWN &&
      !this.canPlace(this.playedPiece.blocks, newPos)
    ) {
      this.addPieceToBoard();
      this.playedPiece = randomTetromino();
      return;
    }

    if (this.canPlace(this.playedPiece.blocks, newPos)) {
      this.playedPiece.position = newPos;
    }
  }

  public quickDrop() {
    let { x, y } = this.playedPiece.position;
    while (this.canPlace(this.playedPiece.blocks, { x, y: y + 1 })) {
      y = y + 1;
    }

    this.playedPiece.position = { x, y };
    this.addPieceToBoard();
    this.playedPiece = randomTetromino();
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

  private addPieceToBoard() {
    const { x: posX, y: posY } = this.playedPiece.position;
    const blocks = this.playedPiece.blocks;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[0].length; x++) {
        if (!blocks[y][x]) continue;

        const boardY = posY + y;
        const boardX = posX + x;

        if (boardY < 0) continue;

        this.board[boardY][boardX] = blocks[y][x];
      }
    }

    this.checkFullLine();
  }

  private checkFullLine() {
    const newBoard: Block[][] = [];
    let linesCleared = 0;

    // Keep only NON-full lines
    for (const line of this.board) {
      if (line.includes(null)) {
        newBoard.push(line);
      } else {
        linesCleared++;
      }
    }

    const width = this.board[0].length;
    for (let i = 0; i < linesCleared; i++) {
      const emptyLine: Block[] = Array(width).fill(null);
      newBoard.unshift(emptyLine);
    }

    this.board = newBoard;
  }
}

function rotateMatrixCW<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}
