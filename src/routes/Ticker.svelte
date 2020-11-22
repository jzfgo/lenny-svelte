<script>
  import f from '../stores/formatters';
  import bot from '../stores/bot';

  import TitleBar from "../components/TitleBar.svelte";
  import TotalEarnings from "../components/TotalEarnings.svelte";
  import CurrencyDetails from "../components/CurrencyDetails.svelte";
  import CurrencyRate from "../components/CurrencyRate.svelte";
  import ListItem from "../components/ListItem.svelte";
  import LogSummary from "../components/LogSummary.svelte";

  export let params = {};

  let currency;
  $: if ($bot.currencies) {
    currency = $bot.currencies.get(params.ticker);
  }
</script>

{#if currency}
  <TitleBar title={currency.config.name} />

  <section class="summary">
    <h2>Total earnings</h2>
    <TotalEarnings config={currency.config} chart={currency.chart} summary={currency.summary} />
  </section>

  {#if currency.exchangeRate.price !== 1}
    <section class="exchange">
      <h2>Exchange rate</h2>
      <CurrencyRate
        icon={currency.config.icon}
        rate={currency.exchangeRate.price}
        change24h={currency.exchangeRate.change24h}
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
      value1={$f.formatCurrency(currency.summary.estEarningsYear)}
      value2={$f.formatCurrency(currency.summary.estEarningsMonth)}
      value3={$f.formatCurrency(currency.summary.estEarnings24h)}
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

{#if currency}
<section class="module log">
  <h2>Activity log</h2>
  <ListItem link={`/activity-log/${params.ticker}`}>
    <LogSummary {...currency.log[0]} />
  </ListItem>
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
