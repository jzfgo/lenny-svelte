<script>
  import bot from '../stores/bot'

  import TitleBar from "../components/TitleBar.svelte";
  import LogItem from "../components/LogItem.svelte";

  export let params = {};

  const titleBarProps = {
    title: 'Activity Log',
  };

  let log = [];
  $: if ($bot.currencies) {
    log = params?.ticker ? $bot.currencies.get(params.ticker).log : $bot.aggregate.log;
  }
</script>

<TitleBar {...titleBarProps} />
{#if log}
  <div class="log">
    {#each log as logItem}
      <LogItem {...logItem} />
    {:else}
      No activity.
    {/each}
  </div>
{/if}

<style>
.log {
  padding: 20px 15px;
  background-color: var(--color-background-darker);
}
</style>
