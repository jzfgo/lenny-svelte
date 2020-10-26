const getJSON = async () => {
  let res = await fetch(`/botlog.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processLog = (data) => {
  let logProcessed = [];

  if (data && data.log) {
    data.log.reverse();
    logProcessed = data.log.map((item) => ({
      time: item.substr(0, 19),
      message: item.substr(20),
    }));
  }

  return logProcessed;
};

const processCurrency = (ticker, data, displayCurrency) => {
  const highestBid = parseFloat(data[ticker].highestBid) || 0;
  const averageLendingRate =
    parseFloat(data[ticker].averageLendingRate) / 100 || 0;
  const lentSum = parseFloat(data[ticker].lentSum) || 0;
  const maxToLend = parseFloat(data[ticker].maxToLend) || 0;
  const totalCoins = parseFloat(data[ticker].totalCoins) || 0;
  const totalEarnings = parseFloat(data[ticker].totalEarnings) || 0;
  const yesterdayEarnings = parseFloat(data[ticker].yesterdayEarnings) || 0;
  const todayEarnings = parseFloat(data[ticker].todayEarnings) || 0;

  const sameCurrency = ticker == displayCurrency.currency;
  // 1 for BTC and the current display currency, ticker's exchange rate for the rest
  const tickerRate = sameCurrency || ticker === "BTC" ? 1 : highestBid;
  // 1 for the current display currency, display currency's exchange rate for the rest
  const exchangeRate = sameCurrency ? 1 : displayCurrency.highestBid;

  const pctLent = maxToLend ? lentSum / maxToLend : 0;
  const pctLentTotal = totalCoins ? lentSum / totalCoins : 0;

  const earningsTotal = totalEarnings * tickerRate * exchangeRate;
  const earningsYesterday = yesterdayEarnings * tickerRate * exchangeRate;
  const earningsToday = todayEarnings * tickerRate * exchangeRate;

  const netRate = averageLendingRate * 0.85;
  const effectiveRate = netRate * pctLent;
  const yearlyRate = effectiveRate * 365;
  const yearlyRateCompound = (Math.pow(1 + netRate, 365) - 1) * pctLent; // with daily reinvestment

  const estEarnings24h =
    (lentSum * (1 + netRate) - lentSum) * tickerRate * exchangeRate;
  const estEarningsMonth =
    (lentSum * Math.pow(1 + netRate, 30) - lentSum) * tickerRate * exchangeRate;
  const estEarningsYear =
    (lentSum * Math.pow(1 + netRate, 365) - lentSum) *
    tickerRate *
    exchangeRate;

  return {
    averageLendingRate,
    earningsToday,
    earningsTotal,
    earningsYesterday,
    estEarnings24h,
    estEarningsMonth,
    estEarningsYear,
    exchangeRate,
    lentSum,
    maxToLend,
    pctLent,
    pctLentTotal,
    sameCurrency,
    ticker: ticker.toLowerCase(),
    tickerRate,
    totalCoins,
    yearlyRate,
    yearlyRateCompound,
  };
};

const processCurrencies = (data) => {
  let currencies = [];
  let summary = {};

  if (data && data["raw_data"]) {
    const tickers = Object.keys(data.raw_data);

    tickers.forEach((ticker) => {
      let currency = processCurrency(
        ticker,
        data.raw_data,
        data.outputCurrency
      );
      currencies.push(currency);
    });

    summary = currencies.reduce((a, b) => ({
      earningsTotal: a.earningsTotal + b.earningsTotal,
      earningsYesterday: a.earningsYesterday + b.earningsYesterday,
      earningsToday: a.earningsToday + b.earningsToday,
      estEarnings24h: a.estEarnings24h + b.estEarnings24h,
      estEarningsMonth: a.estEarningsMonth + b.estEarningsMonth,
      estEarningsYear: a.estEarningsYear + b.estEarningsYear,
    }));

    return { currencies, summary };
  }
};

export default async () => {
  const botlog = await getJSON();

  return {
    ...processCurrencies(botlog),
    log: processLog(botlog),
  };
};
