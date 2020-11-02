<script>
  import { DATE_FORMATTER } from '../utils/formatters';

  import LineChart from "../components/LineChart.svelte";
  import Indicator from "../components/Indicator.svelte";

  export let currency;

  const { summary } = currency;
</script>

<div class="line-chart">
  <LineChart {currency} width="100vw" height="200px" strokeWidth="3px" />
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
