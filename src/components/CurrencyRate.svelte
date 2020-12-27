<script lang="ts">
  export let change24h;
  export let icon;
  export let rate;
  export let loss = false;
</script>

<div class="currency-rate">
  <div class="ticker">
    <svelte:component this={icon}/>
  </div>
  <div class="rate">{rate}</div>
  {#if change24h}
  <div class="change24h">
    <span class="value" class:loss>{change24h}</span>
    <span class="label">24H</span>
  </div>
  {/if}
</div>

<style>
  .currency-rate {
    position: relative;
    display: grid;
    grid-template-columns: 4rem min-content 1fr;
    align-items: center;

    background: rgba(0,0,0,.3);
    border-radius: 0.625rem;
    margin: 0.625rem 0.9375rem;
  }

  .ticker {
    width: 4rem;
    height: 4rem;
  }

  .rate {
    font-size: 1.5rem;
    margin-right: 1.5rem;
  }

  .change24h {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }

  .change24h .value {
    color: var(--color-success);
  }
  .change24h .loss {
    color: var(--color-error);
  }

  .change24h .label {
    font-weight: 700;
    font-size: .75rem;
    color: var(--color-foreground-darker);
    text-align: right;
    text-transform: uppercase;
    margin-right: 1.5rem;
  }
</style>
