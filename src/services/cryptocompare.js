const Service = require('src/libs/service');
const CryptoCompareApi = require('src/libs/api/cryptocompare');
const Rate = require('src/libs/rate');

/**
 * Class for work with api of https://www.cryptocompare.com
 */
class CryptoCompareService extends Service {
  static getApiConstructor() {
    return CryptoCompareApi;
  }

  /**
   * Return leader of currencies by trading volumes for last 24 hours
   * @param {string} quote
   * @param {number} limit
   * @return {Promise<Rate[]>}
   */
  async getLeaders(quote, limit) {
    limit = limit - 1; // the limit fix for their api

    const data = await this.api.getTopVolumes({ tsym: quote, limit });
    const symbols = [];

    data.Data.forEach(item => symbols.push(item.SYMBOL));

    const prices = await this.api.getPrice({
      fsym: quote,
      tsyms: symbols.slice(0, 500).join()
    });

    return data.Data.map(item => {
      const price = prices.hasOwnProperty(item.SYMBOL) ? prices[item.SYMBOL] : 0;
      return new Rate(this.getId(), quote, item.SYMBOL, item.VOLUME24HOURTO, price);
    });
  }
}

module.exports = CryptoCompareService;