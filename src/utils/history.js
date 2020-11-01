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
    LAST_DATE + i * DAY_LENGTH,
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

  const summary = {
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
  // console.log(ticker, summary, slicedMergedPoints);

  return {
    ticker: ticker.toLowerCase(),
    summary,
    points,
  };
};

const processCurrencies = (data) => {
  let currencies = new Map();
  let summary = {};

  Object.keys(data).forEach((ticker) => {
    let currency = processCurrency(ticker, data);
    currencies.set(ticker.toLowerCase(), currency);
  });

  return { currencies, summary };
};

export default async () => {
  const history = await getJSON();

  return {
    ...processCurrencies(history),
  };
};
