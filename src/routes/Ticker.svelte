<script>
  import { tweenFrom } from '../utils/tweens';

  import f from '../stores/formatters';
  import bot from '../stores/bot';

  import TitleBar from "../components/TitleBar.svelte";
  import TotalEarnings from "../components/TotalEarnings.svelte";
  import CurrencyDetails from "../components/CurrencyDetails.svelte";
  import CurrencyRate from "../components/CurrencyRate.svelte";
  import ListItem from "../components/ListItem.svelte";
  import LogSummary from "../components/LogSummary.svelte";

  export let params = {};

  const rateTween = tweenFrom(0);
  const change24hTween = tweenFrom(0);

  const pctLent = tweenFrom(0);
  const pctLentTotal = tweenFrom(0);
  const lentSum = tweenFrom(0);
  const maxToLend = tweenFrom(0);
  const totalCoins = tweenFrom(0);

  const yearlyRateCompound = tweenFrom(0);
  const avgLendingRate = tweenFrom(0);
  const estEarningsYear = tweenFrom(0);
  const estEarningsMonth = tweenFrom(0);
  const estEarnings24h = tweenFrom(0);

  let currency;
  $: if ($bot.currencies) {
    currency = $bot.currencies.get(params.ticker);

    rateTween.set(currency.exchangeRate.price);
    change24hTween.set(currency.exchangeRate.change24h);

    pctLent.set(currency.details.pctLent);
    pctLentTotal.set(currency.details.pctLentTotal);
    lentSum.set(currency.details.lentSum);
    maxToLend.set(currency.details.maxToLend);
    totalCoins.set(currency.details.totalCoins);

    yearlyRateCompound.set(currency.details.yearlyRateCompound);
    avgLendingRate.set(currency.details.avgLendingRate);
    estEarningsYear.set(currency.summary.estEarningsYear);
    estEarningsMonth.set(currency.summary.estEarningsMonth);
    estEarnings24h.set(currency.summary.estEarnings24h);
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
        rate={$f.formatCurrency($rateTween, { minimumFractionDigits: 2 })}
        change24h={$f.formatPercentage($change24hTween, { signDisplay: "always" })}
        loss={currency.exchangeRate.change24h < 0}
      />
    </section>
  {/if}

  <section class="lent">
    <h2>Amount Lent</h2>
    <CurrencyDetails
      pct1={$pctLent}
      pct2={$pctLentTotal}
      value1={$f.formatDecimal($lentSum, { minimumFractionDigits:2, maximumFractionDigits: 4 })}
      value2={$f.formatDecimal($maxToLend, { minimumFractionDigits:2, maximumFractionDigits: 4 })}
      value3={$f.formatDecimal($totalCoins, { minimumFractionDigits:2, maximumFractionDigits: 4 })}
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
      pct1={$yearlyRateCompound}
      pct2={$avgLendingRate}
      value1={$f.formatCurrency($estEarningsYear)}
      value2={$f.formatCurrency($estEarningsMonth)}
      value3={$f.formatCurrency($estEarnings24h)}
      value1label="year"
      value2label="month"
      value3label="day"
      pct1label="APY"
      pct2label="EDR"
      gradientStart={currency.config.gradientStart}
      gradientEnd={currency.config.gradientEnd}
      altValues={{
        value1: $f.formatDecimal(currency.details.estEarningsYear, { minimumFractionDigits:2, maximumFractionDigits: 4 }),
        value2: $f.formatDecimal(currency.details.estEarningsMonth, { minimumFractionDigits:2, maximumFractionDigits: 4 }),
        value3: $f.formatDecimal(currency.details.estEarnings24h, { minimumFractionDigits:2, maximumFractionDigits: 4 })}}
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
