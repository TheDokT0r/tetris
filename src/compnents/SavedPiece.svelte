<script lang="ts">
    import { savedPiece } from "@/stores/gameData";
  import { onMount } from "svelte";
    const BLOCK_SIZE = 50 as const;

    let canvas = $state<HTMLCanvasElement>();
    let ctx = $state<CanvasRenderingContext2D | null>(null);

    onMount(() => {
      if (!canvas) return;
      ctx = canvas.getContext("2d");
    })

    function drawSavedPiece() {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!$savedPiece.piece) return;

        const { blocks } = $savedPiece.piece;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[0].length; x++) {
                const block = blocks[y][x];
                if (block) {
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
            }
        }
    }

    $effect(() => {
        if (!$savedPiece.piece || !canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawSavedPiece();
    });
</script>

<div>
    <canvas bind:this={canvas}></canvas>
    {#if $savedPiece.piece}
        <p>Holding: {$savedPiece.piece.id}</p>
    {:else}
        <p>Holding: Nothing</p>
    {/if}
</div>
