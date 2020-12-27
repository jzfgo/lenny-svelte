<script lang="ts">
  import { onMount } from 'svelte';
  import * as Pancake from '@sveltejs/pancake';
  import { extent } from 'd3-array';
  import { scaleLinear, scaleTime } from 'd3-scale';
  import { line, curveBasis } from 'd3-shape';

  type Point = {
    x: number,
    y: number,
  }

  export let chart = {} as any;
  export let width : string;
  export let height : string;
  export let gradientStart = '#ff80bf';
  export let gradientEnd = '#ffca80';
  export let strokeWidth : string;
  export let startOpacity = 1;
  export let animationDuration = '1s';

  const { points } = chart;

  const xAccessor = (d: Point) => d.x;
  const yAccessor = (d: Point) => d.y;

  const xScale = scaleTime()
    .domain(extent(points, xAccessor))
    .range([0, 100]);

  const yScale = scaleLinear()
    .domain(extent(points, yAccessor))
    .range([100, 0]);

  // the path generator
  const pathLine = line()
    .x((d: Point) => xScale(xAccessor(d)))
    .y((d: Point) => yScale(yAccessor(d)))
    .curve(curveBasis);

  let wrapper : HTMLElement;
  let lineLength = 0;
  onMount(() => {
    const path : SVGPathElement = wrapper.querySelector('path.data');
    lineLength = path.getTotalLength() * (wrapper.clientWidth / 100);
  });
</script>

<div class="chart" bind:this={wrapper} style="--length: {lineLength}; --width: {width}; --height: {height}; --strokeWidth: {strokeWidth}; --animationDuration: {animationDuration}">
  <Pancake.Chart>
    <Pancake.Svg>
      <defs>
        <linearGradient id={`linear-${gradientStart}-${gradientEnd}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stop-color={gradientStart} stop-opacity={startOpacity} />
          <stop offset="100%" stop-color={gradientEnd} />
        </linearGradient>
      </defs>
      <Pancake.SvgLine data={points}>
        <path class="data" d={pathLine(points)} stroke={`url(#linear-${gradientStart}-${gradientEnd})`} />
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
    animation: progress var(--animationDuration) ease-out;
    transition: stroke-dashoffset 1s ease-out;
    stroke-dasharray: var(--length);
    stroke-dashoffset: 0;
    stroke-linecap: round;
  }

  @keyframes progress {
    from {
      stroke-dashoffset: var(--length);
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  :global(.chart svg) {
    padding: calc(var(--strokeWidth) / 2);
  }
</style>
