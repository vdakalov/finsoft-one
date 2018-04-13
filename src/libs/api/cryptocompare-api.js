const Api = require('src/libs/api');

class CryptoCompareApiApi extends Api {
  getBaseUrl() {
    return 'https://www.cryptocompare.com/api/data/';
  }

  prepareData(data) {
    return data['Data'];
  }

  /**
   * Get general info for all the coins available on the website.
   * @return {Promise<Object>}
   */
  async getCoinList() {
    const response = await this.request('coinlist', {});
    const data = [];
    const keys = Object.keys(response);

    for (const key of keys) {
      const rate = response[key];
      data.push(rate.Symbol);
    }

    return data;
  }


}

module.exports = CryptoCompareApiApi;