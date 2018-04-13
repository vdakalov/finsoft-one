const Api = require('src/libs/api');

/**
 * Class for work with api of https://coinmarketcap.com
 */
class CoinMarketCapApi extends Api {
  getBaseUrl() {
    return 'https://api.coinmarketcap.com/v1/';
  }

  /**
   *
   * Available convert values: "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF",
   * "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB",
   * "TRY", "TWD", "ZAR"
   *
   * @param {Object} params
   * @param {number} [params.start] return results from rank [start] and above
   * @param {number} [params.limit] return a maximum of [limit] results (default is 100, use 0 to return all results)
   * @param {string} [params.convert] return price, 24h volume, and market cap in terms of another currency.
   * @return {Promise<any>}
   */
  async getTickers(params = {}) {
    return this.request('ticker/', params)
  }

  /**
   *
   * @param {string} id Ticker id
   * @param {Object} [params]
   * @param {string} [params.convert] return price, 24h volume, and market cap in terms of another currency.
   * @return {Promise<any>}
   */
  async getTickerById(id, params = {}) {
    return this.request(`ticker/${id}/`, params);
  }
}

module.exports = CoinMarketCapApi;
