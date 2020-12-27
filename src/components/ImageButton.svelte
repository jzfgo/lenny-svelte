<script lang="ts">
import type { SvelteComponent } from 'svelte';

  import { push } from 'svelte-spa-router'

  export let link : string;
  export let image : SvelteComponent;

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
