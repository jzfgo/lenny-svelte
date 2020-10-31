<script>
  import { PERCENTAGE_FORMATTER } from '../utils/formatters';

  import RadialGraph from './graphs/RadialGraph.svelte';

  export let pct1 = 0;
  export let pct1label = ' ';

  export let pct2 = 0;
  export let pct2label = ' ';

  export let value1 = 0.0;
  export let value1label = 'Label';

  export let value2 = 0.0;
  export let value2label = 'Label';

  export let value3 = 0.0;
  export let value3label = 'Label';

</script>

<div class="currency-details">
  <div class="graph">
    <RadialGraph radius="48" pct={pct1}>
      <div class="percentages">
        <div class="pct-1">
          <div class="label">{pct1label}</div>
          <div class="value">{PERCENTAGE_FORMATTER.format(pct1)}</div>
        </div>
        <div class="pct-2">
          <div class="value">{PERCENTAGE_FORMATTER.format(pct2)}</div>
          <div class="label">{pct2label}</div>
        </div>
      </div>
    </RadialGraph>
  </div>
  <div class="data">
    <div class="value-1 value">
      <span class="value">{value1}</span>
      <span class="label">{value1label}</span>
    </div>
    <div class="value-2 value">
      <span class="value">{value2}</span>
      <span class="label">{value2label}</span>
    </div>
    <div class="value-3 value">
      <span class="value">{value3}</span>
      <span class="label">{value3label}</span>
    </div>
  </div>
</div>

<style>
  .currency-details {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: 3rem;
    align-items: center;

    background: rgba(0,0,0,.3);
    border-radius: 0.625rem;
    margin: 0.625rem 0.9375rem;
    padding: 1.5rem;
    height: 9rem;
  }

  .graph .percentages {
    display: grid;
    place-items: center;
    place-content: center;
    text-align: center;
    padding: 0.6875rem 0 0.5rem 0;
  }

  .percentages .label {
    font-weight: 700;
    font-size: 0.625rem;
    color: var(--main-muted-color);
    text-transform: uppercase;
  }

  .pct-1 .value {
    font-size: 1.5rem;
  }

  .pct-2 {
    margin-top: -0.3125rem;
  }

  .pct-2 .value {
    font-size: .75rem;
    color: var(--main-muted-color);
  }

  .pct-2 .label {
    margin-top: 0.25rem;
  }

  .data {
    display: grid;

    gap: 10px;
  }

  .value {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 1rem;
  }

  .value-1 .value {
    font-size: 1.5rem;
  }

  .data .label {
    font-weight: 700;
    font-size: .75rem;
    color: var(--main-muted-color);
    text-align: right;
    text-transform: uppercase;
  }
</style>
