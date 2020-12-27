<script lang="ts">
  import { push } from 'svelte-spa-router'

  export let link;
  export let image;

  const changeView = () => link && push(link);
</script>

<div class="image-button" on:click={changeView}>
  <svelte:component this={image} />
</div>

<style>
  .image-button {
    display: grid;
    cursor: pointer;
    place-items: center;
    position: relative;
  }
</style>
