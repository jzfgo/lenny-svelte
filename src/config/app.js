const refreshInterval = __myapp.env.REFRESH_INTERVAL;

export default {
  displayCurrency: "USD",
  supportedDisplayCurrencies: ["USD", "EUR", "GBP", "JPY"],
  effRateMode: "lentperc",
  chartDays: 30,
  gradientEnd: "#ffca80",
  gradientStart: "#ff80bf",
  refreshInterval: refreshInterval ?? 30,
};
