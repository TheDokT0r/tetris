import Game from "./board";
import "./style.css";
import { type Block } from "./tetromino";

let ctx: CanvasRenderingContext2D | null = null;
let canvas: HTMLCanvasElement;
const BLOCK_SIZE = 50 as const;
const game = new Game(10, 20);

function setCanvasSize() {
  const { board } = game;
  canvas.height = board.length * BLOCK_SIZE;
  canvas.width = board[0].length * BLOCK_SIZE;
}

function drawBlock(block: Block, x: number, y: number) {
  if (!ctx || !block) return;

  const absoluteX = BLOCK_SIZE * x;
  const absoluteY = BLOCK_SIZE * y;

  ctx.save();

  ctx.fillStyle = block.color;
  ctx.fillRect(absoluteX, absoluteY, BLOCK_SIZE, BLOCK_SIZE);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);

  ctx.restore();
}

// function drawTetromino(tetromino: Tetromino) {
//   const blocks = tetromino.getBlocks();
//   blocks.forEach((line) => {
//     line.forEach((block) => {
//       drawBlock(block);
//     });
//   });
// }

function drawBoard() {
  const { board } = game;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      drawBlock(board[i][j], j, i);
    }
  }
}

function drawTetromino() {
  const { playedPiece } = game;
  const { blocks, position } = playedPiece;
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[0].length; j++) {
      drawBlock(blocks[i][j], position.x + j, position.y + i);
    }
  }
}

onload = () => {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  setCanvasSize();
  drawBoard();
  drawTetromino();
  // drawBlock({ x: 0, y: 0, color: "red" });
  // drawTetromino(randomPiece());

  // document.addEventListener("keypress", (event) => {});
};
