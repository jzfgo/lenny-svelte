<script>
  export let pct = 0;
  export let radius = 24;
  export let stokeWidth = 2;
  export let trackColor = '#22212c';
  export let progressColor = '#ffca80';

  let width = radius * 2;
  let height = radius * 2;
  let internalRadius = radius - (stokeWidth/2);

  const circ = 2 * Math.PI * internalRadius;

  let progress = circ * (1 - pct);
</script>

<div class="radial-graph" style="--width: {width}px; --height: {height}px">
  <svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
    <circle cx={radius} cy={radius} r={internalRadius} fill="none" stroke={trackColor} stroke-width="1" />
    <circle class="progress" style="--circ: {circ}; --progress: {progress}" cx={radius} cy={radius} r={internalRadius} fill="none" stroke={progressColor} stroke-width={stokeWidth} />
  </svg>
  <div class="slot">
    <slot />
  </div>
</div>

<style>
  .radial-graph {
    width: var(--width);
    height: var(--height);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;
  }

  svg, .slot {
    width: var(--width);
    height: var(--height);
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }

  svg {
    transform: rotate(-90deg);
  }

  .progress {
    stroke-dasharray: var(--circ);
    stroke-dashoffset: var(--progress);
    animation: progress 1s;

  }

  @keyframes progress {
    from {
        stroke-dashoffset: 0;
    }
    to {
        stroke-dashoffset: var(--progress);
    }
  }
</style>
