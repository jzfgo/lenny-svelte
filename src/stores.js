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
      botlogData.currencies.forEach((botlogCurrency, key, _) => {
        currencies.set(key, {
          config: curConfig[key],
          ...botlogCurrency,
          ...historyData.currencies.get(key),
        });
      });

      return {
        aggregate: {
          config: {
            displayCurrency: "USD",
            effRateMode: "lentperc",
            gradientEnd: "#ffca80",
            gradientStart: "#ffca80",
            refreshInterval: 30,
          },
          chart: historyData.chart,
          log: botlogData.log,
          summary: botlogData.summary,
        },
        currencies,
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
  }, 10000);

  return () => clearInterval(interval);
});
