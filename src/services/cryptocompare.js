const Service = require('src/libs/service');

/**
 * Class for work with api of https://www.cryptocompare.com
 */
class CryptoCompareService extends Service {
  getBaseUrl() {
    return 'https://min-api.cryptocompare.com/data/';
  }

  prepareData(data) {
    return data['Data'];
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
  async getTopPairs(params = {}) {
    return this.request('top/pairs', params);
  }

  normalizeData(data) {
    return data.map(item => ({
      id: item.toSymbol,
      service: 'cryptocompare',
      volume: item.volume24h
    }));
  }

  async getLeaders(quote, limit) {
    return this.request('top/pairs', { fsym: quote, limit });
  }
}

module.exports = CryptoCompareService;