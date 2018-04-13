/**
 * Class of currency rate
 */
class Rate {
  /**
   *
   * @param {string} system
   * @param {string} from
   * @param {string} to
   * @param {number} volume24h
   * @param {number} price
   */
  constructor(system, from, to, volume24h, price) {
    this.system = system;
    this.from = from;
    this.to = to;
    this.volume24h = volume24h;
    this.price = price;
  }
  toJSON() {
    return {
      system: this.system,
      from: this.from,
      to: this.to,
      volume24h: this.volume24h,
      price: this.price
    };
  }
}

module.exports = Rate;
