<script>
  import { CURRENCY_FORMATTER } from '../utils/formatters';
  import { tweenFrom } from '../utils/tweens';

  import Indicator from "../components/Indicator.svelte";
  import LineChart from "../components/LineChart.svelte";

  import CornerBottomLeftIcon from '../assets/images/corner-bottom-left.svg';
  import CornerBottomRightIcon from '../assets/images/corner-bottom-right.svg';
  import AngleLeftIcon from '../assets/images/angle-left.svg';
  import AngleRightIcon from '../assets/images/angle-right.svg';

  export let summary;

  const earningsTotal = tweenFrom(0);
  const earningsToday = tweenFrom(0);
  const estEarnings24h = tweenFrom(0);

  $: if (summary) {
    earningsTotal.set(summary.earningsTotal);
    earningsToday.set(summary.earningsToday);
    estEarnings24h.set(summary.estEarnings24h);
  }
</script>

{#if summary}
  <div class="earnings">
    <div class="earnings-total">
      <span class="value">
        {CURRENCY_FORMATTER.format($earningsTotal)}
      </span>
      <div class="label">
        <CornerBottomLeftIcon width="32" /> All Time <CornerBottomRightIcon width="32" />
      </div>
    </div>
    <div class="earnings-24h">
      <Indicator size="regular" icon="piggy-bank" value={CURRENCY_FORMATTER.format($earningsToday)} color="success" />

      <div class="label">
        <AngleLeftIcon width="32" /> 24h <AngleRightIcon width="32" />
      </div>

      <Indicator size="regular" icon="binoculars" value={CURRENCY_FORMATTER.format($estEarnings24h)} color="warning" />
    </div>
  </div>
  <LineChart ticker={summary.ticker} />
{/if}

<style>
  .earnings {
    text-align: center;
  }

  .earnings-total {
    margin-bottom: 0.4375rem;
  }

  .earnings-total .value {
    color: var(--main-fg-color);
    letter-spacing: 0;
    font-weight: 400;
    font-size: 3rem;
  }

  .earnings-total .label {
    margin-top: -1.0625rem;
  }

  .label,
  .earnings-24h {
    display: flex;
    flex-direction: row;
    place-items: center;
    place-content: center;
  }

  .label {
    font-weight: 700;
    font-size: 0.75rem;
    text-align: center;
    text-transform: uppercase;
    color: var(--main-muted-color);
    fill: var(--main-muted-color);
  }
</style>
