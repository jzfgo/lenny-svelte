const getJSON = async () => {
  let res = await fetch(`/botlog.json?${Date.now()}`);
  let data = await res.json();
  return data;
};

const processLog = (rawLog) =>
  rawLog.reverse().map((item) => ({
    time: item.substr(0, 19),
    message: item.substr(20),
  }));

const processCurrency = ({
  averageLendingRate: avgLendingRate = 0,
  lentSum = 0,
  maxToLend = 0,
  todayEarnings: earningsToday = 0,
  totalCoins = 0,
  totalEarnings: earningsTotal = 0,
}) => {
  avgLendingRate = parseFloat(avgLendingRate) / 100;
  lentSum = parseFloat(lentSum);
  maxToLend = parseFloat(maxToLend);
  totalCoins = parseFloat(totalCoins);

  const netRate = avgLendingRate * 0.85;
  const pctLent = maxToLend ? lentSum / maxToLend : 0;
  const effectiveRate = netRate * pctLent;

  return {
    summary: {
      earningsToday: parseFloat(earningsToday),
      earningsTotal: parseFloat(earningsTotal),
      estEarnings24h: lentSum * (1 + netRate) - lentSum,
      estEarningsMonth: lentSum * Math.pow(1 + netRate, 30) - lentSum,
      estEarningsYear: lentSum * Math.pow(1 + netRate, 365) - lentSum,
    },
    details: {
      avgLendingRate,
      lentSum,
      maxToLend,
      pctLent,
      pctLentTotal: totalCoins ? lentSum / totalCoins : 0,
      totalCoins,
      yearlyRate: effectiveRate * 365,
      yearlyRateCompound: (Math.pow(1 + netRate, 365) - 1) * pctLent, // with daily reinvestment,
    },
  };
};

const processCurrencies = (rawCurrencies) => {
  let currencies = new Map();

  Object.keys(rawCurrencies).forEach((ticker) => {
    let currency = processCurrency(rawCurrencies[ticker]);
    currencies.set(ticker.toLowerCase(), currency);
  });

  const summary = Array.from(currencies.values())
    .map((ticker) => ticker.summary)
    .reduce((acc, cur) => ({
      earningsToday: acc.earningsToday + cur.earningsToday,
      earningsTotal: acc.earningsTotal + cur.earningsTotal,
      estEarnings24h: acc.estEarnings24h + cur.estEarnings24h,
      estEarningsMonth: acc.estEarningsMonth + cur.estEarningsMonth,
      estEarningsYear: acc.estEarningsYear + cur.estEarningsYear,
    }));

  return { currencies, summary };
};

export default async () => {
  const { raw_data: rawCurrencies, log: rawLog } = await getJSON();

  return {
    ...processCurrencies(rawCurrencies),
    log: processLog(rawLog),
  };
};
