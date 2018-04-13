const express = require('express');
const app = express();
const config = require(process.argv[2]);
const utils = require('src/libs/utils');
const CoinMarketCapService = require('src/services/coinmarketcap');
const CriptoCompare = require('src/services/cryptocompare');

app.get('/', async (request, response) => {
  const data = [];

  const coinMarketCapService = new CoinMarketCapService();
  data.push(await coinMarketCapService.getLeaders('USD', 100));

  const criptoCompare = new CriptoCompare();
  data.push(await criptoCompare.getLeaders('USD', 100));

  const result = utils.minFromLeaders(...data);

  response.set('Content-Type', 'text/plain');
  response.end(JSON.stringify(result, null, 2));
});

app.listen(config.port, config.host, () => console.log(`Service running and listen ${config.host}:${config.port}`));
