const getChartMeta = (points) => {
  const psX = points.map((p) => p.x);
  const psY = points.map((p) => p.y);

  return {
    min: Math.min(...psY),
    max: Math.max(...psY),
    startDate: new Date(psX[0] * 1000),
  };
};

const processChart = (rawPoints, config, exchangeRate) => {
  const CHART_DAYS = config.chartDays ?? 30;
  const DAY_LENGTH = 86400;
  let d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - CHART_DAYS);
  const FIRST_DATE = d / 1000;

  // Create a range of empty points
  const emptyPoints = [...Array(CHART_DAYS)].map((_, i) => [
    FIRST_DATE + DAY_LENGTH * i,
    0,
  ]);

  // Get a subset of the current data points
  const slicedPoints = rawPoints.filter((point) => point[0] >= FIRST_DATE);

  // Merge the two arrays (removing duplicates)
  // and format it for Pancake charts
  const points = Array.from(new Map([...emptyPoints, ...slicedPoints])).map(
    (point) => ({
      x: point[0],
      y: point[1] * exchangeRate.price,
    })
  );

  const meta = getChartMeta(points);

  return { meta, points };
};

const processCharts = (data, config, exchangeRates) => {
  let currencies = new Map();
  const tickers = Object.keys(data);

  tickers.forEach((tickerRaw) => {
    const ticker = tickerRaw.toLowerCase();

    currencies.set(ticker, {
      chart: processChart(data[tickerRaw], config, exchangeRates.get(ticker)),
    });
  });

  // Summary chart
  const points = Array.from(currencies.values())
    .map(({ chart: { points } }) => points)
    .reduce((acc, cur) =>
      acc.map(({ x, y }) => {
        // Find the same point in the current array
        // or generate an empty point if not present
        let [point] = cur.filter((p) => p.x === x);
        point = point ?? { x, y: 0 };

        return {
          x,
          y: y + point.y,
        };
      })
    );

  const meta = getChartMeta(points);

  return { chart: { meta, points }, currencies };
};

export default async (config, exchangeRates) => {
  try {
    const res = await fetch(`/history.json?${Date.now()}`);
    const history = await res.json();
    return {
      ...processCharts(history, config, exchangeRates),
    };
  } catch (err) {
    console.error(err);
  }
};
