const getJSON = async () => {
  let res = await fetch(`/history.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processCurrency = (ticker, data) => {
  const points = [];
  const rawPoints = data[ticker];
  const CHART_DAYS = 30;
  const DAY_LENGTH = -86400;
  const LAST_DATE = new Date().setUTCHours(0, 0, 0, 0) / 1000;

  // Get the last points
  const slicedPoints = rawPoints.slice(-CHART_DAYS);

  // create a range of empty points
  // (to fill the gaps in the previous one)
  const emptyPoints = [...Array(CHART_DAYS)].map((_, i) => [
    LAST_DATE + (i + 1) * DAY_LENGTH,
    0,
  ]);

  const mergedMap = new Map([
    ...new Map(emptyPoints),
    ...new Map(slicedPoints),
  ]);
  const mergedPoints = Array.from(mergedMap);
  mergedPoints.sort((a, b) => a[0] - b[0]);
  const slicedMergedPoints = mergedPoints.slice(-CHART_DAYS);

  slicedMergedPoints.forEach((point) => {
    points.push({
      x: point[0],
      y: point[1],
    });
  });

  const meta = {
    min: Math.min.apply(
      Math,
      slicedMergedPoints.map((o) => o[1])
    ),
    max: Math.max.apply(
      Math,
      slicedMergedPoints.map((o) => o[1])
    ),
    start: slicedMergedPoints[0][0],
    end: slicedMergedPoints[slicedMergedPoints.length - 1][0],
    count: slicedMergedPoints.length,
  };

  return {
    ticker: ticker.toLowerCase(),
    chart: { meta, points },
  };
};

const processCurrencies = (data, exchangeRates) => {
  let currencies = new Map();
  let chart = {
    meta: {
      min: 0,
      max: 0.00030851,
      start: 1602547200,
      end: 1605052800,
      count: 30,
    },
    points: [],
  };

  Object.keys(data).forEach((ticker) => {
    let currency = processCurrency(ticker, data);
    currencies.set(ticker.toLowerCase(), currency);
  });

  // TODO: Chart

  return { chart, currencies };
};

export default async (currenciesCfg, exchangeRates) => {
  const history = await getJSON();

  return {
    ...processCurrencies(history, currenciesCfg, exchangeRates),
  };
};