/**
 * Return minimum volume currency from leaders
 */
function maxFromLeaders(...services) {
  let table = {};

  for (const rates of services) {
    for (const rate of rates) {
      if (table.hasOwnProperty(rate.to)) {
        if (rate.volume24h > table[rate.to].volume24h) {
          table[rate.to] = rate;
        }
      } else {
        table[rate.to] = rate;
      }
    }
  }

  return Object.values(table);
}

module.exports.maxFromLeaders = maxFromLeaders;