export const CURRENCY_FORMATTER = new Intl.NumberFormat("en", {
  minimumIntegerDigits: 1,
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
});

export const PERCENTAGE_FORMATTER = new Intl.NumberFormat("en", {
  style: "percent",
  maximumSignificantDigits: 3,
});

export const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
