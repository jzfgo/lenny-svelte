<script lang="ts">
  import TitleBar from "../components/TitleBar.svelte";
  import TotalEarnings from "../components/TotalEarnings.svelte";
  import ListItem from "../components/ListItem.svelte";
  import CurrencySummary from "../components/CurrencySummary.svelte";
  import LogSummary from "../components/LogSummary.svelte";

  export let bot;
</script>

<TitleBar title="Lenny" left={{ icon: 'logo' }} right={{ icon: 'settings', link: '/settings' }} />

{#if $bot.aggregate}
<section class="summary">
  <h2>Total earnings</h2>
  <TotalEarnings chart={$bot.aggregate.chart} config={$bot.aggregate.config} summary={$bot.aggregate.summary} />
</section>
{/if}

{#if $bot.currencies}
<section class="currencies">
  <h2>Earnings by currency</h2>
  {#each Array.from($bot.currencies) as [ticker, { chart, config, details: { pctLent, maxToLend }, summary }]}
    {#if maxToLend > 0}
      <ListItem link={`/currency/${ticker}`}>
        <CurrencySummary points={chart?.points} {config} {pctLent} {summary} />
      </ListItem>
    {/if}
  {/each}
</section>
{/if}

{#if $bot.aggregate}
<section class="module log">
  <h2>Activity log</h2>
  <ListItem link="/activity-log">
    <LogSummary {...$bot.aggregate.log[0]} />
  </ListItem>
</section>
{/if}

<style>
  :global(main) {
    background-color: var(--color-background);
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
