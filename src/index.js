const express = require('express');
const app = express();
const config = require(process.argv[2]);
const utils = require('src/libs/utils');

const CoinMarketCapService = require('src/services/coinmarketcap');
const CryptoCompareService = require('src/services/cryptocompare');

const QUOTE = 'USD';
const LIMIT = 100;

app.get('/', async (request, response) => {
  const data = [];
  try {
    const coinMarketCapService = new CoinMarketCapService();
    data.push(await coinMarketCapService.getLeaders(QUOTE, LIMIT));

    const cryptoCompareService = new CryptoCompareService();
    data.push(await cryptoCompareService.getLeaders(QUOTE, LIMIT));

    const result = utils
      .maxPriceFromLeaders(...data)
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, LIMIT);

    response.end(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log(error);
    response.status(500);
    response.end(error.message)
  }
});

app.listen(config.port, config.host, () =>
  console.log(`Service running and listen ${config.host}:${config.port}`));
