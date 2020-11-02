<script>
  import { onMount } from 'svelte';
  import * as Pancake from '@sveltejs/pancake';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { line, curveBasis } from 'd3-shape';

  // the props
  export let currency;
  export let width;
  export let height;
  export let strokeWidth;

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
  });
</script>

<div class="chart" bind:this={wrapper} style="--length: {lineLength}; --width: {width}; --height: {height}; --strokeWidth: {strokeWidth}">
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

<style>
  .chart {
    grid-area: chart;
    width: var(--width);
    height: var(--height);
    overflow: hidden;
  }

  path.data {
    fill: none;
    stroke-width: var(--strokeWidth);
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
</style>
