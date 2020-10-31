import { readable, writable } from "svelte/store";
import getData from "./utils/botlog";

export const params = writable({});

export const data = readable({}, (set) => {
  getData().then((data) => set(data));

  const interval = setInterval(() => {
    getData().then((data) => set(data));
    console.log("Updating…");
  }, 30000);

  return () => clearInterval(interval);
});
