import { readable, writable } from "svelte/store";
import curConfig from "./config/currencies";
import getBotlogData from "./utils/botlog";
import getHistoryData from "./utils/history";

export const params = writable({});

const gatherData = async () => {
  return Promise.all([getBotlogData(), getHistoryData()])
    .then((data) => {
      const [botlogData, historyData] = data;

      const currencies = new Map();
      botlogData.currencies.forEach((botlogCurrency, key, map) => {
        currencies.set(key, {
          config: curConfig[key],
          ...botlogCurrency,
          ...historyData.currencies.get(key),
        });
      });

      return {
        currencies,
        summary: { ...botlogData.summary, ...historyData.summary },
        log: botlogData.log,
      };
    })
    .catch((reason) => {
      console.log(reason);
    });
};

export const data = readable({}, (set) => {
  gatherData().then((data) => set(data));

  const interval = setInterval(() => {
    gatherData().then((data) => set(data));
    console.log("Updating…");
  }, 30000);

  return () => clearInterval(interval);
});
