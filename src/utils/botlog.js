const getJSON = async () => {
  let res = await fetch(`/botlog.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processLog = (rawLog, filter) => {
  const log = filter
    ? rawLog.filter((item) => item.indexOf(` ${filter} `) !== -1)
    : rawLog;

  return log.reverse().map((item) => ({
    time: item.substr(0, 19),
    message: item.substr(20),
  }));
};

const processCurrency = (
  {
    averageLendingRate: avgLendingRate = 0,
    lentSum = 0,
    maxToLend = 0,
    todayEarnings: earningsToday = 0,
    totalCoins = 0,
    totalEarnings: earningsTotal = 0,
  },
  config,
  exchangeRate
) => {
  avgLendingRate = parseFloat(avgLendingRate) / 100;
  lentSum = parseFloat(lentSum);
  maxToLend = parseFloat(maxToLend);
  totalCoins = parseFloat(totalCoins);

  const netRate = avgLendingRate * 0.85;
  const pctLent = maxToLend ? lentSum / maxToLend : 0;
  const effectiveRate = netRate * pctLent;

  return {
    config,
    exchangeRate,
    details: {
      avgLendingRate,
      lentSum,
      maxToLend,
      pctLent,
      pctLentTotal: totalCoins ? lentSum / totalCoins : 0,
      totalCoins,
      yearlyRate: effectiveRate * 365,
      yearlyRateCompound: (Math.pow(1 + netRate, 365) - 1) * pctLent, // with daily reinvestment
    },
    summary: {
      earningsToday: parseFloat(earningsToday) * exchangeRate.price,
      earningsTotal: parseFloat(earningsTotal) * exchangeRate.price,
      estEarnings24h: (lentSum * (1 + netRate) - lentSum) * exchangeRate.price,
      estEarningsMonth:
        (lentSum * Math.pow(1 + netRate, 30) - lentSum) * exchangeRate.price,
      estEarningsYear:
        (lentSum * Math.pow(1 + netRate, 365) - lentSum) * exchangeRate.price,
    },
  };
};

const processCurrencies = (
  { raw_data: rawCurrencies, log: rawLog },
  currenciesCfg,
  exchangeRates
) => {
  let currencies = new Map();
  const tickers = Object.keys(rawCurrencies);

  tickers.forEach((tickerRaw) => {
    const ticker = tickerRaw.toLowerCase();

    let currency = processCurrency(
      rawCurrencies[tickerRaw],
      currenciesCfg.get(ticker),
      exchangeRates.get(ticker)
    );
    currency.log = processLog(rawLog, tickerRaw);
    currencies.set(ticker, currency);
  });

  // TODO: Convert summary values to common currency before summing them

  const summary = Array.from(currencies.values())
    .map((ticker) => ticker.summary)
    .reduce((acc, cur) => ({
      earningsToday: acc.earningsToday + cur.earningsToday,
      earningsTotal: acc.earningsTotal + cur.earningsTotal,
      estEarnings24h: acc.estEarnings24h + cur.estEarnings24h,
      estEarningsMonth: acc.estEarningsMonth + cur.estEarningsMonth,
      estEarningsYear: acc.estEarningsYear + cur.estEarningsYear,
    }));

  return { currencies, summary, log: processLog(rawLog) };
};

export default async (currenciesCfg, exchangeRates) => {
  const botlog = await getJSON();

  return {
    ...processCurrencies(botlog, currenciesCfg, exchangeRates),
  };
};
