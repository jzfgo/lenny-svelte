<script>
	import Router from 'svelte-spa-router';
  import Gradients from "./assets/images/gradients.svg";
	import { routes, bot } from './routes';

  let theme;
  $: theme = $bot.aggregate?.config.themes.get($bot.aggregate?.config.theme);
</script>

<main style="--color-background: {theme?.colorBackground}; --color-background-darker: {theme?.colorBackgroundDarker}; --color-foreground-darker: {theme?.colorForegroundDarker}; --color-muted: {theme?.colorMuted};">
  <Router {routes} restoreScrollState={true} />
  <Gradients />
</main>
