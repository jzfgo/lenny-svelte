<script>
  import * as Pancake from '@sveltejs/pancake';
  import currencies from '../config/currencies';
  import getData from '../utils/history';

  import LineChartBg from '../assets/images/line-chart-bg.svg';
  import Indicator from "../components/Indicator.svelte";

  export let ticker;

  const curConfig = currencies[ticker];

  let currency;
  let curData;
  getData().then((data) => {
    [curData] = data.currencies.filter(currency => currency.ticker === ticker);
    currency = { ...curConfig, ...curData};
  });
</script>

<div class="line-chart">
  {#if curData}
  <div class="chart">
    <LineChartBg style="position:absolute; top:0; right:0; bottom:0; left:0; width:100vw; height:260px; z-index: 0" />
    <Pancake.Chart x1={currency.summary.x1} x2={currency.summary.x2} y1={currency.summary.y1} y2={currency.summary.y2}>
      <Pancake.Svg>
        <defs>
          <linearGradient id={`linear-${ticker}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color={curConfig.gradientStart} />
            <stop offset="100%" stop-color={curConfig.gradientEnd} />
          </linearGradient>
        </defs>
        <Pancake.SvgLine data={currency.points} let:d>
          <path class="data" stroke={`url(#linear-${ticker})`} {d} />
        </Pancake.SvgLine>
      </Pancake.Svg>
    </Pancake.Chart>
  </div>
  {/if}
  <div class="metadata">
    <Indicator icon="arrow-to-left" value="14 March, 2020" color="muted" />

    <div class="minmax">
      <Indicator icon="arrow-to-bottom" value="$0.00" color="error" />
      <Indicator icon="arrow-to-top" value="$0.00" color="success" />
    </div>
  </div>
</div>

<style>
  .line-chart {
    display: grid;
    grid-template-columns: 100vw;
    grid-template-rows: 30px 200px 30px;
    grid-template-areas:
      "."
      "chart"
      "metadata";
    place-content: space-between;

    position: relative;
  }

  .chart {
    grid-area: chart;
    height: 200px;
  }

  .metadata {
    grid-area: metadata;
    align-self: end;

    z-index: 1;
    height: 24px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .metadata,
  .minmax {
    display: flex;
    gap: 15px;
    justify-content: space-between;
  }

  svg {
    overflow: visible;
  }

  path.data {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3px;
  }
</style>
