<script>
  import { CURRENCY_FORMATTER } from '../utils/formatters';
  import { tweenFrom } from '../utils/tweens';

  import Indicator from "../components/Indicator.svelte";
  import RadialGraph from './graphs/RadialGraph.svelte';
  import LineChart from "../components/LineChart.svelte";

  export let currency;

  const earningsTotalTween = tweenFrom(0);
  const earningsTodayTween = tweenFrom(0);
  const estEarnings24hTween = tweenFrom(0);

  $: {
    earningsTotalTween.set(currency.earningsTotal);
    earningsTodayTween.set(currency.earningsToday);
    estEarnings24hTween.set(currency.estEarnings24h);
  }
</script>

<div class="currency-summary">
  <div class="radial-graph">
    <RadialGraph pct={currency.pctLent} gradientStart={currency.config.gradientStart} gradientEnd={currency.config.gradientEnd}>
      <svelte:component this={currency.config.icon} />
    </RadialGraph>
  </div>
  <div class="earningsTotal">{CURRENCY_FORMATTER.format($earningsTotalTween)}</div>
  <div class="earnings24h">
    <Indicator icon="piggy-bank" value={CURRENCY_FORMATTER.format($earningsTodayTween)} background={false} color="success" />
    <Indicator icon="binoculars" value={CURRENCY_FORMATTER.format($estEarnings24hTween)} background={false} color="warning" />
  </div>
  <div class="line-chart">
    <LineChart {currency} width="4rem" height="3rem" strokeWidth="1px" />
  </div>
</div>

<style>
  .currency-summary {
    display: grid;
    align-content: space-between;
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

  .line-chart {
    width: 4rem;
    height: 3rem;
  }
</style>
