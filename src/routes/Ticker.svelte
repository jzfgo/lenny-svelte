<script>
  import { CURRENCY_FORMATTER } from '../utils/formatters';
  import { data } from '../stores';

  import TitleBar from "../components/TitleBar.svelte";
  import TotalEarnings from "../components/TotalEarnings.svelte";
  import CurrencyDetails from "../components/CurrencyDetails.svelte";
  import CurrencyRate from "../components/CurrencyRate.svelte";

  export let params = {};

  let currency;
  $: if ($data.currencies) {
    currency = $data.currencies.get(params.ticker);
  }
</script>

{#if currency}
  <TitleBar title={currency.config.name} />

  <section class="summary">
    <h2>Total earnings</h2>
    <TotalEarnings config={currency.config} chart={currency.chart} summary={currency.summary} />
  </section>

  {#if !currency.details.sameCurrency}
    <section class="exchange">
      <h2>Exchange rate</h2>
      <CurrencyRate
        config={currency.config}
        rate={0}
        change24h={0}
      />
    </section>
  {/if}

  <section class="lent">
    <h2>Amount Lent</h2>
    <CurrencyDetails
      pct1={currency.details.pctLent}
      pct2={currency.details.pctLentTotal}
      value1={currency.details.lentSum}
      value2={currency.details.maxToLend}
      value3={currency.details.totalCoins}
      value1label="lent"
      value2label="lendable"
      value3label="total"
      gradientStart={currency.config.gradientStart}
      gradientEnd={currency.config.gradientEnd}
    />
  </section>

  <section class="estimation">
    <h2>Estimated earnings</h2>
    <CurrencyDetails
      pct1={currency.details.yearlyRateCompound}
      pct2={currency.details.avgLendingRate}
      value1={CURRENCY_FORMATTER.format(currency.summary.estEarningsYear)}
      value2={CURRENCY_FORMATTER.format(currency.summary.estEarningsMonth)}
      value3={CURRENCY_FORMATTER.format(currency.summary.estEarnings24h)}
      value1label="year"
      value2label="month"
      value3label="day"
      pct1label="APY"
      pct2label="EDR"
      gradientStart={currency.config.gradientStart}
      gradientEnd={currency.config.gradientEnd}
    />
  </section>
{/if}

<style>
  :global(main) {
    background-color: var(--color-charade);
  }

  section {
    margin-top: 1.25rem;
  }

  section:last-child {
    padding-bottom: 1.25rem;
  }

  section h2 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0;
    font-weight: 700;
    font-size: 0.75rem;
  }
</style>
