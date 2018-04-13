const Api = require('src/libs/api');

/**
 * Class for work with api of https://www.cryptocompare.com
 */
class CryptoCompareApi extends Api {
  getBaseUrl() {
    return 'https://min-api.cryptocompare.com/data/';
  }

  hasErrors(data) {
    const error = super.hasErrors(data);

    if (error) {
      return error;
    }

    if (typeof data === 'object' && data.Response === 'Error') {
      return new Error(`${this.constructor.name}: ${data.Message}`);
    }
  }

  /**
   * Get top pairs by volume for a currency (always uses our aggregated data). The number of pairs you get is the
   * minimum of the limit you set (default 5) and the total number of pairs available
   * @param {Object} params
   * @param {string} params.fsym From Symbol
   * @param {string} params.tsym To Symbol
   * @param {number} [params.limit=5] Max 2000
   * @param {boolean} [params.sign=false] If set to true, the server will sign the request
   * @return {Promise<Object>}
   */
  async getTopPairs(params) {
    return this.request('top/pairs', params);
  }

  /**
   * Get top exchanges by volume for a currency pair. The number of exchanges you get is the minimum of the limit you
   * set (default 5) and the total number of exchanges available
   * @param {Object} params
   * @param {string} params.fsym The cryptocurrency symbol of interest [Max character length: 10]
   * @param {string} params.tsym The currency symbol to convert into [Max character length: 10]
   * @param {number} params.limit The number of data points to return
   * @return {Promise<Object[]>}
   */
  async getTopExchanges(params) {
    return this.request('top/exchanges', params);
  }

  /**
   * Get top coins by volume for the to currency. It returns volume24hto and total supply (where available). The number
   * of coins you get is the minimum of the limit you set (default 50) and the total number of coins available
   * @param {Object} params
   * @param {string} params.tsym The currency symbol to convert into [Max character length: 10]
   * @param {number} params.limit The number of data points to return
   * @return {Promise<Object[]>}
   */
  async getTopVolumes(params) {
    return this.request('top/volumes', params);
  }

  /**
   * Get the current price of any cryptocurrency in any other currency that you need.
   * If the crypto does not trade directly into the toSymbol requested, BTC will be used for conversion. If the oposite
   * pair trades we invert it (eg.: BTC-XMR)
   * @param {Object} params
   * @param {string} params.fsym The cryptocurrency symbol of interest [Max character length: 10]
   * @param {string} params.tsyms Comma separated cryptocurrency symbols list to convert into [Max character length: 500]
   * @return {Promise<Object[]>}
   */
  async getPrice(params) {
    return this.request('price', params);
  }

  /**
   * Same as single API path but with multiple from symbols
   * @param {Object} params
   * @param {string} params.fsym Comma separated cryptocurrency symbols list [Max character length: 300]
   * @param {string} params.tsyms Comma separated cryptocurrency symbols list to convert into [Max character length: 100]
   * @return {Promise<Object[]>}
   */
  async getPrices(params) {
    return this.request('pricemulti', params);
  }
}

module.exports = CryptoCompareApi;
