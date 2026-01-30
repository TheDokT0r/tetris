interface BoardPiece {
  occupied: false;
  color?: string;
}

interface Position {
  x: number;
  y: number;
}

export default class Board {
  private board: BoardPiece[][];

  constructor(width: number, height: number) {
    const newBoard: BoardPiece[][] = [];
    for (let i = 0; i < height; i++) {
      const line: BoardPiece[] = [];
      for (let j = 0; j < width; j++) {
        line.push({ occupied: false });
      }

      newBoard.push(line);
    }

    this.board = newBoard;
  }

  public setPiece({ x, y }: Position, piece: BoardPiece) {
    this.board[y][x] = piece;
  }

  public getPiece({ x, y }: Position) {
    return this.board[y][x];
  }
}
