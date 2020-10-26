<script>
  import icons from '../currency-icons'
  import { CURRENCY_FORMATTER } from '../formatters';
  import { tweenFrom } from '../tweens';

  import Indicator from "../components/Indicator.svelte";
  import RadialGraph from './graphs/RadialGraph.svelte';

  export let ticker = 'btc';
  export let pctLent = .5;
  export let earningsTotal = 0;
  export let earningsToday = 0;
  export let estEarnings24h = 0;

  const earningsTotalTween = tweenFrom(0);
  const earningsTodayTween = tweenFrom(0);
  const estEarnings24hTween = tweenFrom(0);

  $: {
    earningsTotalTween.set(earningsTotal);
    earningsTodayTween.set(earningsToday);
    estEarnings24hTween.set(estEarnings24h);
  }
</script>

<div class="currency-summary">
  <div class="graph">
    <RadialGraph pct={pctLent}>
      <svelte:component this={icons[ticker]}/>
    </RadialGraph>
  </div>
  <div class="earningsTotal">{CURRENCY_FORMATTER.format($earningsTotalTween)}</div>
  <div class="earnings24h">
    <Indicator icon="piggy-bank" value={CURRENCY_FORMATTER.format($earningsTodayTween)} background={false} color="success" />
    <Indicator icon="binoculars" value={CURRENCY_FORMATTER.format($estEarnings24hTween)} background={false} color="warning" />
  </div>
  <div class="graph">
  </div>
</div>

<style>
  .currency-summary {
    display: grid;
    grid-template-columns: 3rem 7.5rem 4rem 4rem;

    width: max-content;
    height: 3rem;
    margin: 1rem 0 1rem 1rem;
  }

  .earningsTotal {
    margin-left: 1rem;
    letter-spacing: 0;
    font-weight: 400;
    line-height: 3rem;
    font-size: 1.5rem;
    color: var(--color-spring-wood);
  }
</style>
