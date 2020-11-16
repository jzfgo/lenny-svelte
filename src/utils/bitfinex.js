const bitfinexApi = __myapp.env.BITFINEX_API_URL;

export default async (tickers = [], displayCurrency) => {
  const pairs = tickers
    .filter((ticker) => ticker !== displayCurrency)
    .map(
      (ticker) => `t${ticker.toUpperCase()}${displayCurrency.toUpperCase()}`
    );
  const params = pairs.join(",");

  let rates = new Map();
  tickers.forEach((ticker) => {
    rates.set(ticker, { price: 1, change24h: 0 });
  });

  try {
    const req = await fetch(`${bitfinexApi}/v2/tickers?symbols=${params}`);
    const response = await req.json();

    response.forEach((value) => {
      const ticker = value[0]
        .substring(1, value[0].length - displayCurrency.length)
        .toLowerCase();
      const rate = { price: value[7], change24h: value[6] };
      rates.set(ticker, rate);
    });

    return rates;
  } catch (err) {
    console.error(err);
  }
};
