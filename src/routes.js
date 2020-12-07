import { wrap } from "svelte-spa-router/wrap";

import bot from "./stores/bot";

import Home from "./routes/Home.svelte";
import Log from "./routes/Log.svelte";
import NotFound from "./routes/NotFound.svelte";
import Settings from "./routes/Settings.svelte";
import Ticker from "./routes/Ticker.svelte";

const routes = new Map();

routes.set(
  "/",
  wrap({
    component: Home,
    props: { bot },
  })
);

routes.set(
  "/activity-log/:ticker?",
  wrap({
    component: Log,
    props: { bot },
  })
);

routes.set(
  "/currency/:ticker",
  wrap({
    component: Ticker,
    props: { bot },
  })
);

routes.set("/settings", wrap({ component: Settings }));

routes.set("*", wrap({ component: NotFound }));

export { routes, bot };
