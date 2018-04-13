/**
 * Return minimum volume currency from leaders
 */
function maxPriceFromLeaders(...services) {
  let table = {};

  for (const rates of services) {
    for (const rate of rates) {
      if (table.hasOwnProperty(rate.to)) {
        if (rate.price > table[rate.to].price) {
          table[rate.to] = rate;
        }
      } else {
        table[rate.to] = rate;
      }
    }
  }

  return Object.values(table);
}

module.exports.maxPriceFromLeaders = maxPriceFromLeaders;