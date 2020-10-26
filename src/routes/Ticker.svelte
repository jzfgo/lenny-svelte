<script>
  import { data } from '../stores';
  import { CURRENCY_FORMATTER } from '../formatters';

  import TitleBar from "../components/TitleBar.svelte";
  import TotalEarnings from "../components/TotalEarnings.svelte";
  import CurrencyDetails from "../components/CurrencyDetails.svelte";
  import CurrencyRate from "../components/CurrencyRate.svelte";

  export let params = {};

  const titleBarProps = {
    title: params.ticker?.toLocaleUpperCase(),
  };

  $: [currency] = $data.currencies.filter(currency => currency.ticker === params.ticker);
</script>

{#if currency}
<main>
  <TitleBar {...titleBarProps} />

  <section class="summary">
    <h2>Total earnings</h2>
    <TotalEarnings summary={currency} />
  </section>

  <section class="lent">
    <h2>Amount Lent</h2>
    <CurrencyDetails
      pct1={currency.pctLent}
      pct2={currency.pctLentTotal}
      value1={currency.lentSum}
      value2={currency.maxToLend}
      value3={currency.totalCoins}
      value1label="lent"
      value2label="lendable"
      value3label="total"
    />
  </section>

  <section class="estimation">
    <h2>Estimated earnings</h2>
    <CurrencyDetails
      pct1={currency.yearlyRate}
      pct2={currency.averageLendingRate}
      value1={CURRENCY_FORMATTER.format(currency.estEarningsYear)}
      value2={CURRENCY_FORMATTER.format(currency.estEarningsMonth)}
      value3={CURRENCY_FORMATTER.format(currency.estEarnings24h)}
      value1label="year"
      value2label="month"
      value3label="day"
      pct1label="APY"
      pct2label="EDR"
    />
  </section>

  {#if !currency.sameCurrency}
  <section class="exchange">
    <h2>Exchange rate</h2>
    <CurrencyRate
      ticker={currency.ticker}
      rate={currency.tickerRate * currency.exchangeRate}
      change24h={0}
    />
  </section>
  {/if}
</main>
{/if}

<style>
  main {
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
