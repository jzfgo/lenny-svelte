const getJSON = async () => {
  let res = await fetch(`/history.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processChart = (rawPoints, exchangeRate) => {
  const points = [];
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
      y: point[1] * exchangeRate.price,
    });
  });

  const meta = {
    min: Math.min.apply(
      Math,
      slicedMergedPoints.map((o) => o[1] * exchangeRate.price)
    ),
    max: Math.max.apply(
      Math,
      slicedMergedPoints.map((o) => o[1] * exchangeRate.price)
    ),
    start: slicedMergedPoints[0][0],
    end: slicedMergedPoints[slicedMergedPoints.length - 1][0],
    count: slicedMergedPoints.length,
  };

  return { meta, points };
};

const processCharts = (data, exchangeRates) => {
  let currencies = new Map();
  const tickers = Object.keys(data);

  tickers.forEach((tickerRaw) => {
    const ticker = tickerRaw.toLowerCase();

    currencies.set(ticker, {
      chart: processChart(data[tickerRaw], exchangeRates.get(ticker)),
    });
  });

  const chart = {
    points: Array.from(currencies.values())
      .map(({ chart: { points } }) => points)
      .reduce((acc, cur) =>
        acc.map(({ x, y }, i) => ({
          x,
          y: y + cur[i].y,
        }))
      ),
    get meta() {
      return {
        min: Math.min.apply(
          Math,
          this.points.map((o) => o.y)
        ),
        max: Math.max.apply(
          Math,
          this.points.map((o) => o.y)
        ),
        start: this.points[0].x,
        end: this.points[this.points.length - 1].x,
        count: this.points.length,
      };
    },
  };

  return { chart, currencies };
};

export default async (exchangeRates) => {
  const history = await getJSON();

  return {
    ...processCharts(history, exchangeRates),
  };
};
