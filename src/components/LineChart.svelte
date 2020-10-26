<script>
  import LineChartBg from '../assets/images/line-chart-bg.svg';
  import Indicator from "../components/Indicator.svelte";
</script>

<div class="line-chart">
  <LineChartBg width="100vw" height="16.25rem" />
  <div class="metadata">
    <Indicator icon="arrow-to-left" value="14 March, 2020" color="muted" />

    <div class="minmax">
      <Indicator icon="arrow-to-bottom" value="$0.00" color="error" />
      <Indicator icon="arrow-to-top" value="$0.00" color="success" />
    </div>
  </div>
</div>

<style>
  .metadata,
  .minmax {
    display: flex;
    gap: 0.9375rem;
    justify-content: space-between;
  }

  .metadata {
    margin: -1.5rem 0.9375rem 0;
  }
</style>
