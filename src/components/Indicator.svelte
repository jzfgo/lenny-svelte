<script>
  import icons from '../ui-icons'

  export let size = 'small';
  export let icon = 'piggy-bank';
  export let value = '$0.00';
  export let color = '';
  export let background = true;
</script>

<div class="indicator indicator--{size} {(background ? 'indicator--bg' : '')} {color ? `indicator--${color}` : ''} ">
  <svelte:component this={icons[icon]} class="icon icon--{size}" />
  <span class="value">{value}</span>
</div>

<style>
  .indicator {
    display: grid;
    align-items: center;

    text-transform: uppercase;

    width: min-content;
    border-radius: 0.3125rem;
    cursor: pointer;

    fill: var(--color-muted);
  }

  .value {
    white-space: nowrap;
  }

  /* :global() prevents Svelte from deleting the styles */
  :global(.icon--small) {
    height: 1.5rem;
  }

  :global(.icon--regular) {
    height: 2rem;
  }

  .indicator--bg {
    background: rgba(0,0,0,.3);
  }

  .indicator--regular {
    grid-template-columns: 2rem 1fr;

    font-size: 1rem;

    height: 2rem;
    padding-right: 0.75rem;
  }

  .indicator--small {
    grid-template-columns: 1.5rem 1fr;

    font-size: 0.75rem;

    height: 1.5rem;
    padding-right: 0.5rem;
  }

  .indicator--success .value {
    color: var(--color-success);
  }

  .indicator--warning .value {
    color: var(--color-warning);
  }

  .indicator--error .value {
    color: var(--color-error);
  }

  .indicator--muted .value {
    color: var(--color-foreground-darker);
  }
</style>
