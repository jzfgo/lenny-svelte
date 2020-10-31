const getJSON = async () => {
  let res = await fetch(`/history.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processCurrency = (ticker, data) => {
  const points = [];

  // Select the last day
  // create a range of 15 days

  data[ticker].slice(-14).forEach((point) => {
    points.push({
      x: point[0],
      y: point[1],
    });
  });

  const summary = {
    y1: Math.min.apply(
      Math,
      points.map((o) => o.y)
    ),
    y2: Math.max.apply(
      Math,
      points.map((o) => o.y)
    ),
    x1: Math.min.apply(
      Math,
      points.map((o) => o.x)
    ),
    x2: Math.max.apply(
      Math,
      points.map((o) => o.x)
    ),
    count: points.length,
  };
  // console.log(summary);

  return {
    ticker: ticker.toLowerCase(),
    summary,
    points,
  };
};

const processCurrencies = (data) => {
  const tickers = Object.keys(data);

  let summary = {};
  let currencies = [];
  tickers.forEach((ticker) => {
    let currency = processCurrency(ticker, data);
    currencies.push(currency);
  });

  return { currencies, summary };
};

export default async () => {
  const history = await getJSON();

  return {
    ...processCurrencies(history),
  };
};
