<script lang="ts">
  import f from '../stores/formatters';
  import { tweenFrom } from '../utils/tweens';

  import Indicator from "../components/Indicator.svelte";
  import RadialGraph from './graphs/RadialGraph.svelte';
  import LineChart from "../components/LineChart.svelte";

  export let chart;
  export let config;
  export let pctLent;
  export let summary;

  const { gradientStart, gradientEnd, icon } = config;
  const { earningsTotal, earningsToday, estEarnings24h } = summary;

  const earningsTotalTween = tweenFrom(0);
  const earningsTodayTween = tweenFrom(0);
  const estEarnings24hTween = tweenFrom(0);

  let pct = 0;
  $: {
    earningsTotalTween.set(earningsTotal);
    earningsTodayTween.set(earningsToday);
    estEarnings24hTween.set(estEarnings24h);

    pct = pctLent;
  }
</script>

<div class="currency-summary">
  <div class="radial-graph">
    <RadialGraph {pct} {gradientStart} {gradientEnd}>
      <svelte:component this={icon} />
    </RadialGraph>
  </div>
  <div class="earningsTotal">{$f.formatCurrency($earningsTotalTween)}</div>
  <div class="earnings24h">
    <Indicator icon="piggy-bank" value={$f.formatCurrency($earningsTodayTween)} background={false} color="success" />
    <Indicator icon="binoculars" value={$f.formatCurrency($estEarnings24hTween)} background={false} color="warning" />
  </div>
  <div class="line-chart">
    <LineChart {chart} {gradientStart} {gradientEnd} width="4rem" height="3rem" strokeWidth="1px" startOpacity="0" />
  </div>
</div>

<style>
  .currency-summary {
    display: grid;
    align-content: space-between;
    grid-template-columns: 3rem minmax(7.5rem, 1fr) minmax(4rem, 1fr) 4rem;
    height: 3rem;
    margin: 1rem 0 1rem 1rem;
  }

  .earningsTotal {
    margin-left: 1rem;
    letter-spacing: 0;
    font-weight: 400;
    line-height: 3rem;
    font-size: 1.5rem;
    color: var(--color-foreground);
  }

  .line-chart {
    width: 4rem;
    height: 3rem;
  }
</style>
