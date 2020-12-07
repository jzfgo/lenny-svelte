import themes from "./themes";

const refreshInterval = __myapp.env.REFRESH_INTERVAL;

export default {
  displayCurrency: "USD",
  supportedDisplayCurrencies: ["USD", "EUR", "GBP", "JPY"],
  chartDays: 30,
  theme: "default",
  themes,
  refreshInterval: refreshInterval ?? 30,
};
