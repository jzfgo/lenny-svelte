<script>
  export let pct = 0;
  export let radius = 24;
  export let stokeWidth = 2;
  export let gradientStart = '#000';
  export let gradientEnd = '#fff';

  let width = radius * 2;
  let height = radius * 2;
  let internalRadius = radius - (stokeWidth/2);

  const circ = 2 * Math.PI * internalRadius;

  $: progress = circ * (1 - pct);
</script>

<div class="radial-graph" style="--width: {width}px; --height: {height}px">
  <svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
    <defs>
      <linearGradient id={`gradient-${gradientStart}-${gradientEnd}`} x1="0%" x2="100%" y1="0" y2="100%">
        <stop offset="0"   stop-color={gradientStart} />
        <stop offset="100%" stop-color={gradientEnd} />
      </linearGradient>
    </defs>
    <circle fill="none" stroke="#22212c" stroke-width="1" cx={radius} cy={radius} r={internalRadius} />
    <circle fill="none" stroke={`url(#gradient-${gradientStart}-${gradientEnd})`} stroke-width={stokeWidth} class="progress" style="--circ: {circ}; --progress: {progress}" cx={radius} cy={radius} r={internalRadius} />
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
    animation: progress 1s;
    transition: stroke-dashoffset 1s ease-out;
    stroke-dasharray: var(--circ);
    stroke-dashoffset: var(--progress);
  }

  @keyframes progress {
    from {
      stroke-dashoffset: var(--circ);
    }
    to {
      stroke-dashoffset: var(--progress);
    }
  }
</style>
