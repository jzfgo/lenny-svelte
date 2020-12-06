<script>
  import f from '../stores/formatters';
  import { tweenFrom } from '../utils/tweens';

  import Indicator from "../components/Indicator.svelte";
  import EarningsChart from "./EarningsChart.svelte";

  import CornerBottomLeftIcon from '../assets/images/corner-bottom-left.svg';
  import CornerBottomRightIcon from '../assets/images/corner-bottom-right.svg';
  import AngleLeftIcon from '../assets/images/angle-left.svg';
  import AngleRightIcon from '../assets/images/angle-right.svg';
  import LineChartBg from '../assets/images/line-chart-bg.svg';

  export let chart;
  export let config;
  export let summary;

  const earningsTotal = tweenFrom(0);
  const earningsToday = tweenFrom(0);
  const estEarnings24h = tweenFrom(0);

  $: if (summary) {
    earningsTotal.set(summary.earningsTotal);
    earningsToday.set(summary.earningsToday);
    estEarnings24h.set(summary.estEarnings24h);
  }
</script>

<div class="earnings">
  <div class="earnings-total">
    <span class="value">
      {$f.formatCurrency($earningsTotal)}
    </span>
    <div class="label">
      <CornerBottomLeftIcon width="32" /> All Time <CornerBottomRightIcon width="32" />
    </div>
  </div>
  <div class="earnings-24h">
    <Indicator size="regular" icon="piggy-bank" value={$f.formatCurrency($earningsToday)} color="success" />

    <div class="label">
      <AngleLeftIcon width="32" /> 24h <AngleRightIcon width="32" />
    </div>

    <Indicator size="regular" icon="binoculars" value={$f.formatCurrency($estEarnings24h)} color="warning" />
  </div>
</div>
{#if chart && config}
  <LineChartBg />
  <EarningsChart {chart} gradientStart={config.gradientStart} gradientEnd={config.gradientEnd} />
{/if}

<style>
  .earnings {
    text-align: center;
  }

  .earnings-total {
    margin-bottom: 0.4375rem;
  }

  .earnings-total .value {
    color: var(--color-foreground);
    letter-spacing: 0;
    font-weight: 400;
    font-size: 3rem;
  }

  .earnings-total .label {
    margin-top: -1.0625rem;
  }

  .label,
  .earnings-24h {
    display: flex;
    flex-direction: row;
    place-items: center;
    place-content: center;
  }

  .label {
    font-weight: 700;
    font-size: 0.75rem;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-foreground-darker);
    fill: var(--color-foreground-darker);
  }

  :global(#line-chart-bg) {
    position: absolute;
    width: 100vw;
    height: 260px;
  }
</style>
