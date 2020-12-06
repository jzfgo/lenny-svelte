<script>
  export let time;
  export let message;
</script>

<div class="log-item">
  <span class="time">{time}</span>
  <span class="message">{message}</span>
</div>

<style>
  .log-item {
    display: grid;
    grid-template-columns: 5.625rem 1fr;
    grid-gap: 0.625rem;

    margin-bottom: 0.625rem;
    font-size: 0.875rem;
}

  .time {
    font-weight: 700;
    text-align: center;
    border-radius: 0.1875rem;
    background-color: var(--color-background);
    color: var(--color-accent);
  }

  .message {
    color: var(--color-foreground);
  }
</style>
