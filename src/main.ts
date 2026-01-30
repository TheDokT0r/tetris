import "./style.css";
import Tetromino, { randomPiece, type Block } from "./tetromino";

let ctx: CanvasRenderingContext2D | null = null;
let canvas: HTMLCanvasElement;
const BLOCK_SIZE = 50 as const;

function setBoardSize() {
  canvas.width = 10 * BLOCK_SIZE;
  canvas.height = 20 * BLOCK_SIZE;
}

function drawBlock(block: Block) {
  if (!ctx || !block) return;

  const x = BLOCK_SIZE * block.x;
  const y = BLOCK_SIZE * block.y;

  ctx.save();

  ctx.fillStyle = block.color;
  ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);

  ctx.restore();
}

function drawTetromino(tetromino: Tetromino) {
  const blocks = tetromino.getBlocks();
  blocks.forEach((line) => {
    line.forEach((block) => {
      drawBlock(block);
    });
  });
}

onload = () => {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  setBoardSize();
  // drawBlock({ x: 0, y: 0, color: "red" });
  drawTetromino(randomPiece());

  document.addEventListener("keypress", (event) => {});
};
