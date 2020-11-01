import { CurveInterpolator } from "curve-interpolator";

const getJSON = async () => {
  let res = await fetch(`/history.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processCurrency = (ticker, data) => {
  const points = [];
  const rawPoints = data[ticker];
  const CHART_DAYS = 15;
  const DAY_LENGTH = -86400;
  const LAST_DATE = new Date().setUTCHours(0, 0, 0, 0) / 1000;

  // Get the last points
  const slicedPoints = rawPoints.slice(-CHART_DAYS);

  // create a range of 15 days
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
  console.log(ticker, slicedMergedPoints);

  // const smoothPoints = mergedPoints;
  const interp = new CurveInterpolator(slicedMergedPoints, { tension: 0.2 });
  const smoothPoints = interp.getPoints(slicedMergedPoints.length * 10);

  smoothPoints.forEach((point) => {
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
