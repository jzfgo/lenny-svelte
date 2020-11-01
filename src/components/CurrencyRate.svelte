<script>
  import { CURRENCY_FORMATTER, PERCENTAGE_FORMATTER } from '../utils/formatters';
  import { tweenFrom } from '../utils/tweens';

  export let config;
  export let rate;
  export let change24h;

  const rateTween = tweenFrom(0);
  const change24hTween = tweenFrom(0);

  $: {
    rateTween.set(rate);
    change24hTween.set(change24h);
  }
</script>

<div class="currency-rate">
  <div class="ticker">
    <svelte:component this={config.icon}/>
  </div>
  <div class="rate">{CURRENCY_FORMATTER.format($rateTween)}</div>
  {#if change24h}
  <div class="change24h">
    <span class="value">{PERCENTAGE_FORMATTER.format($change24hTween)}</span>
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

  .change24h .label {
    font-weight: 700;
    font-size: .75rem;
    color: var(--main-muted-color);
    text-align: right;
    text-transform: uppercase;

    margin-right: 1.5rem;
  }
</style>
