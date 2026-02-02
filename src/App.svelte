<script lang="ts">
    import Game from "./compnents/Game.svelte";
    import SavedPiece from "./compnents/SavedPiece.svelte";
</script>

<main>
    <div>

    <Game />
    </div>
    <div>

    <SavedPiece />
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        text-align: center;

        div {
            margin: 5%;
        }
    }
</style>
