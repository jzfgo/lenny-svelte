<script>
  import ImageButton from './ImageButton.svelte';

  import LogoIcon from '../assets/images/lenny.svg';
  import SettingsIcon from '../assets/images/cog.svg';
  import BackIcon from '../assets/images/angle-left.svg';

  export let title = '';
  export let left = {
      icon: 'back',
      link: '/',
  };
  export let right = {};

  const icons = {
    logo: LogoIcon,
    settings: SettingsIcon,
    back: BackIcon,
  };
</script>

<div class="title-bar">
{#if left}
  <ImageButton image={icons[left.icon]} link={left.link} />
{/if}
  <h1 class="title">{title}</h1>
{#if right}
  <ImageButton image={icons[right.icon]} link={right.link} />
{/if}
</div>

<style>
  .title-bar {
    height: 3.75rem;
    padding: 0.625rem;
    background-color: var(--color-background);

    display: grid;
    grid-template-columns: 2.5rem 1fr 2.5rem;

    position: sticky;
    top: 0;
    right: 0;
    left: 0;

    fill: var(--color-accent);
    z-index: 1000;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 2.5rem;
    text-align: center;
    color: var(--color-foreground);
    margin: 0;

  }
</style>
