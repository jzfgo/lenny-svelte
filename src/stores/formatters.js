import { derived } from "svelte/store";

import config from "./config";
import currenciesCfg from "./currencies";

export default derived(
  [config, currenciesCfg],
  async ([$config, $currenciesCfg], set) => {
    set({
      formatCurrency: (value, options = {}) => {
        const defaults = {
          style: "currency",
          currency: $config?.displayCurrency ?? "USD",
          currencyDisplay: "narrowSymbol",
        };

        const currencyOpts =
          $currenciesCfg.get(defaults.currency.toLowerCase())?.format ?? {};

        return new Intl.NumberFormat("en", {
          ...defaults,
          ...currencyOpts,
          ...options,
        }).format(value);
      },

      formatDecimal: (value, options = {}) => {
        const defaults = {
          style: "decimal",
        };

        return new Intl.NumberFormat("en", {
          ...defaults,
          ...options,
        }).format(value);
      },

      formatPercentage: (value, options = {}) => {
        const defaults = {
          style: "percent",
          maximumSignificantDigits: 3,
        };

        return new Intl.NumberFormat("en", {
          ...defaults,
          ...options,
        }).format(value);
      },

      formatDate: (value, options = {}) => {
        const defaults = {
          dateStyle: "medium",
        };

        return new Intl.DateTimeFormat("en", {
          ...defaults,
          ...options,
        }).format(value);
      },
    });

    return () => ({});
  },
  {}
);
