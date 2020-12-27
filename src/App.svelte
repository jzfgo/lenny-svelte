<script lang="ts">
  import type { Theme } from './config/themes';
	import Router from 'svelte-spa-router';
  import themes from './config/themes';
  import Gradients from "./assets/images/gradients.svg";
	import { routes, bot } from './routes';

  let themeName = 'default';
  let currentTheme : Theme;

  $: {
    themeName = ($bot as any).aggregate?.config.theme
    currentTheme = themes.get(themeName ?? 'default');
  };
</script>

<main style="--color-background: {currentTheme.colorBackground}; --color-background-darker: {currentTheme.colorBackgroundDarker}; --color-foreground-darker: {currentTheme.colorForegroundDarker}; --color-muted: {currentTheme.colorMuted};">
  <Router {routes} restoreScrollState={true} />
  <Gradients />
</main>
