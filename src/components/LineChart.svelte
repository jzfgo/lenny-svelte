<script>
  import { onMount } from 'svelte';
  import * as Pancake from '@sveltejs/pancake';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { line, curveBasis } from 'd3-shape';

  import { DATE_FORMATTER } from '../utils/formatters';

  import LineChartBg from '../assets/images/line-chart-bg.svg';
  import Indicator from "../components/Indicator.svelte";

  // the props
  export let currency;

  const { summary, config } = currency;

  // the scales
  const xScale = scaleLinear()
    .domain(extent(currency.points.map(d => d.x)))
    .range([0, 100]);

  const yScale = scaleLinear()
    .domain(extent(currency.points.map(d => d.y)))
    .range([100, 0]);

  // the path generator
  const pathLine = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(curveBasis);

  let wrapper;
  let lineLength = 0;
  onMount(() => {
    const path = wrapper.querySelector('path.data');
    lineLength = path.getTotalLength() * (wrapper.clientWidth / 100);
    console.log(lineLength);
  });
</script>

<div class="line-chart" bind:this={wrapper} style="--length: {lineLength}">
  <div class="chart">
    <LineChartBg style="position:absolute; top:0; right:0; bottom:0; left:0; width:100vw; height:260px; z-index: 0" />
    <Pancake.Chart x1={summary.start} x2={summary.end} y1={summary.min} y2={summary.max}>
      <Pancake.Svg>
        <defs>
          <linearGradient id={`linear-${config.gradientStart}-${config.gradientEnd}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color={config.gradientStart} />
            <stop offset="100%" stop-color={config.gradientEnd} />
          </linearGradient>
        </defs>
        <Pancake.SvgLine data={currency.points} let:d>
          <path class="data" d={pathLine(currency.points)} stroke={`url(#linear-${config.gradientStart}-${config.gradientEnd})`} />
        </Pancake.SvgLine>
      </Pancake.Svg>
    </Pancake.Chart>
  </div>
  <div class="metadata">
    <Indicator icon="arrow-to-left" value={DATE_FORMATTER.format(new Date(summary.start*1000))} color="muted" />

    <div class="minmax">
      <Indicator icon="arrow-to-bottom" value={summary.min} color="error" />
      <Indicator icon="arrow-to-top" value={summary.max} color="success" />
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
    width: 100vw;
    height: 200px;
  }

  path.data {
    fill: none;
    stroke-width: 3px;
    animation: progress 1s;
    stroke-dasharray: var(--length);
    stroke-dashoffset: 0;
  }

  @keyframes progress {
    from {
      stroke-dashoffset: var(--length);
    }
    to {
      stroke-dashoffset: 0;
    }
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
</style>
