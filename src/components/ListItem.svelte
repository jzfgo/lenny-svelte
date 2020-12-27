<script lang="ts">
  import { push } from 'svelte-spa-router'

  import AngleRight from '../assets/images/angle-right.svg';

  export let link : string;

  const changeView = () => link && push(link);
</script>

<div class="list-item" on:click={changeView}>
  <slot />
  <AngleRight width="32" height="32" />
</div>

<style>
  .list-item {
    display: grid;
    grid-template-columns: 1fr 2rem;
    align-items: center;

    background: rgba(0,0,0,.3);
    border-radius: 0.625rem;
    margin: 0.625rem 0.9375rem;
    cursor: pointer;

    fill: var(--color-foreground-darker);
  }
</style>
