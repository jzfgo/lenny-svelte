import Home from './routes/Home.svelte';
import Log from './routes/Log.svelte';
import NotFound from './routes/NotFound.svelte';
import Settings from './routes/Settings.svelte';
import Ticker from './routes/Ticker.svelte';

export default {
  '/': Home,
  '/activity-log/:ticker?': Log,
  '/currency/:ticker': Ticker,
  '/settings': Settings,
  // The catch-all route must always be last
  '*': NotFound,
};
