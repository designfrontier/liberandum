const randomBetween = require('random-number-csprng');

const choose = async (pool, count) => {
  const chosen = [];
  let thePool = pool.map(i => i);

  for(let i = 0; i < count; i++) {
    if (thePool.length === 0) {
      break;
    }

    if (thePool.length === 1) {
      chosen.push(thePool[0]);

      return chosen;
    }

    const index = await randomBetween(0, thePool.length - 1);
    const selected = thePool[index];

    chosen.push(selected);
    thePool = thePool.filter(p => p.id !== selected.id);
  }

  return chosen;
};


module.exports = {
  choose
};