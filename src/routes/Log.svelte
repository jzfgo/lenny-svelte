<script>
  import { data } from '../stores'

  import TitleBar from "../components/TitleBar.svelte";
  import LogItem from "../components/LogItem.svelte";

  const titleBarProps = {
    title: 'Activity Log',
  };
</script>

<TitleBar {...titleBarProps} />
{#if $data.log}
  <div class="log">
    {#each $data.log as logItem}
      <LogItem {...logItem} />
    {:else}
      No activity.
    {/each}
  </div>
{/if}

<style>
.log {
  padding: 20px 15px;
}
</style>
