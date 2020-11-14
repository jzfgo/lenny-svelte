<script>
  import { data } from '../stores'

  import TitleBar from "../components/TitleBar.svelte";
  import LogItem from "../components/LogItem.svelte";

  const titleBarProps = {
    title: 'Activity Log',
  };

</script>

<TitleBar {...titleBarProps} />
{#if $data.aggregate}
  <div class="log">
    {#each $data.aggregate.log as logItem}
      <LogItem {...logItem} />
    {:else}
      No activity.
    {/each}
  </div>
{/if}

<style>
.log {
  padding: 20px 15px;
  background-color: var(--color-woodsmoke);
}
</style>
