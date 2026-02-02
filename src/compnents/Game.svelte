<script lang="ts">
    import { onMount } from "svelte";
    import "@/style.css";
    import Game, { Movement } from "@/gameObj/game";
    import { type Block } from "@/gameObj/tetromino";

    let ctx = $state<CanvasRenderingContext2D | null>(null);
    let canvas = $state<HTMLCanvasElement | null>();
    let gameSpeedMs = 1000;
    const BLOCK_SIZE = 50 as const;
    const game = new Game(10, 20);

    function setCanvasSize() {
        if (!canvas) return;
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
        ctx.strokeRect(
            absoluteX + 0.5,
            absoluteY + 0.5,
            BLOCK_SIZE - 1,
            BLOCK_SIZE - 1,
        );

        ctx.restore();
    }

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

    function redraw() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        drawTetromino();
    }

    export function initGameCanvas() {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        setCanvasSize();
        redraw();

        document.addEventListener("keydown", (event) => {
            if (event.key == "ArrowRight") {
                game.movePiece(Movement.RIGHT);
            } else if (event.key == "ArrowLeft") {
                game.movePiece(Movement.LEFT);
            } else if (event.key == "ArrowUp") {
                game.movePiece(Movement.ROTATE);
            } else if (event.key == "ArrowDown") {
                game.movePiece(Movement.DOWN);
            } else if (event.key == "r") {
                game.quickDrop();
            } else if (event.key == "q") {
                game.savePiece();
                document.getElementById("saved-piece")!.innerText =
                    `Holding: ${game.getSavedPiece().piece?.id ?? "Nothing"}`;
            }

            redraw();
        });

        setInterval(() => {
            game.movePiece(Movement.DOWN);
            redraw();
        }, gameSpeedMs);
    }

    onMount(() => {
        initGameCanvas();
    });
</script>

<canvas bind:this={canvas}></canvas>
