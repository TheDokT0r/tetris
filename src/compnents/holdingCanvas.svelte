<script lang="ts">
    import type Tetromino from "@/gameObj/tetromino";

    let text = $state<Tetromino | null>(null);

    function swapSavedPiece(savedPiece: Tetromino) {
        text.innerHTML = `Holding: ${savedPiece.id}`;
    }
</script>

<div>
    <canvas></canvas>
    <p>Holding: None</p>
</div>
