<script>
	import Router from 'svelte-spa-router';
  import Gradients from "./assets/images/gradients.svg";
	import routes from './routes';
</script>

<main>
  <Router {routes} restoreScrollState={true} />
  <Gradients />
</main>
