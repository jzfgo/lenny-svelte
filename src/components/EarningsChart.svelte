<script>
  import f from '../stores/formatters';

  import LineChart from "../components/LineChart.svelte";
  import Indicator from "../components/Indicator.svelte";

  export let chart;
  export let gradientStart;
  export let gradientEnd;

  let startDate = $f.formatDate(new Date(chart.meta.start * 1000));
</script>

{#if chart}
  <div class="line-chart">
    <LineChart {chart} {gradientStart} {gradientEnd} width="100vw" height="200px" strokeWidth="3px" animationDuration="1.5s" />
    <div class="metadata">
      <Indicator icon="arrow-to-left" value={startDate} color="muted" />

      <div class="minmax">
        <Indicator icon="arrow-to-bottom" value={chart.meta.min} color="error" />
        <Indicator icon="arrow-to-top" value={chart.meta.max} color="success" />
      </div>
    </div>
  </div>
{/if}

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
