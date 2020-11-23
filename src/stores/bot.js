import { derived } from "svelte/store";

import currenciesCfg from "../stores/currencies";
import config from "../stores/config";
import getExchangeRates from "../utils/bitfinex";
import getChartsData from "../utils/charts";
import getEarningsData from "../utils/earnings";

const compileData = async (config, currenciesCfg) => {
  try {
    const exchangeRates = await getExchangeRates(
      Array.from(currenciesCfg.keys()),
      config.displayCurrency
    );

    const botData = await getEarningsData(currenciesCfg, exchangeRates);
    const chartsData = await getChartsData(config, exchangeRates);

    const currencies = new Map();
    botData.currencies.forEach((botlogCurrency, key) => {
      currencies.set(key, {
        ...botlogCurrency,
        ...chartsData.currencies.get(key),
      });
    });

    return {
      aggregate: {
        config,
        chart: chartsData.chart,
        log: botData.log,
        summary: botData.summary,
      },
      currencies,
    };
  } catch (err) {
    console.error(err);
  }
};

export default derived(
  [config, currenciesCfg],
  async ([$config, $currenciesCfg], set) => {
    const refreshInterval = $config ? $config.refreshInterval : 10;
    set(await compileData($config, $currenciesCfg));

    const interval = setInterval(async () => {
      set(await compileData($config, $currenciesCfg));
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  },
  {}
);
