<script>
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

  .image-button > * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
