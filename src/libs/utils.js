/**
 * Return minimum volume currency from leaders
 */
function minFromLeaders(...services) {
  let table = {};

  for (const service of services) {
    for (const currency of service) {
      if (table.hasOwnProperty(currency.id)) {
        if (table[currency.id].volume > currency.volume) {
          table[currency.id] = currency;
        }
      } else {
        table[currency.id] = currency;
      }
    }
  }

  return Object.values(table);
}

module.exports.minFromLeaders = minFromLeaders;