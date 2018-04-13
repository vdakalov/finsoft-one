const Service = require('src/libs/service');
const CoinMarketCapApi = require('src/libs/api/coinmarketcap');
const Rate = require('src/libs/rate');

/**
 * Class for work with api of https://coinmarketcap.com
 */
class CoinMarketCapService extends Service {
  static getApiConstructor() {
    return CoinMarketCapApi;
  }

  /**
   * Return leader of currencies by trading volumes for last 24 hours
   * @param {string} quote
   * @param {number} limit
   * @return {Promise<Rate[]>}
   */
  async getLeaders(quote, limit) {
    const data = await this.api.getTickers({ convert: quote, limit });
    return data
      .map(item =>
        new Rate(this.getId(), quote, item.symbol, parseFloat(item['24h_volume_usd']), parseFloat(item.price_usd)));
  }
}

module.exports = CoinMarketCapService;
