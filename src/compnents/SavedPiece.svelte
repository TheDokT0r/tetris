<script lang="ts">
    import { savedPiece } from "@/stores/gameData";
</script>

<div>
    <canvas></canvas>
    {#if $savedPiece.piece}
        <p>Holding: {$savedPiece.piece.id}</p>
    {:else}
        <p>Holding: Nothing</p>
    {/if}
</div>
