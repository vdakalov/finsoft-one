const https = require('https');
const queryString = require('querystring');

/**
 * Base class for work with remote currency services
 */
class Service {

  /**
   * Define service api base url
   * @return {string}
   */
  getBaseUrl() {
    return '';
  }

  /**
   * Define response encoding
   * @returns {string}
   */
  getEncoding() {
    return 'utf8';
  }

  /**
   * Prepare raw service response
   * @param {string} raw Raw response
   * @returns {any}
   */
  prepareResponse(raw) {
    return JSON.parse(raw);
  }

  /**
   * Handle prepared service data
   * @param {any} data Service response data
   * @return {any}
   */
  prepareData(data) {
    return data;
  }

  /**
   * Normalize data
   * @param {Object[]} data
   * @return {Object[]}
   */
  normalizeData(data) {
    return data;
  }

  /**
   * Request data from remote currency service
   * @param {string} path
   * @param {object} params
   * @return {Promise<any>}
   */
  async request(path, params) {
    return new Promise((resolve, reject) => {
      const content = [];
      const url = this.getBaseUrl() + path;
      const stringParams = queryString.stringify(params);

      https.get([url, stringParams].join('?'), response => {
        response.setEncoding(this.getEncoding());
        response.on("data", chunk => content.push(chunk));
        response.on('error', reject);
        response.on("end", () => {
          const raw = content.join('');
          const data = this.prepareResponse(raw);
          const result = this.prepareData(data);
          const normalizedResult = this.normalizeData(result);
          resolve(normalizedResult);
        });
      });
    });
  }

  /**
   * Get top leader currency-pair for specified quote currency
   * @param {string} quote Quote currency
   * @param {number} limit
   * @return {Promise<Object[]>}
   */
  async getLeaders(quote, limit) {
  }
}

module.exports = Service;
