export const CURRENCY_FORMATTER = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 5,
});

export const PERCENTAGE_FORMATTER = new Intl.NumberFormat("en", {
  style: "percent",
  maximumSignificantDigits: 3,
});

export const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
