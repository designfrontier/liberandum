const crypto = require('crypto');
const randomBetween = require('random-number-csprng');

const weight = (person) => {
  const rtn = [person];

  for(let i = 0; i < person.value.get('household_size'); i++) {
    rtn.push(person);
  }

  return rtn;
};

const forgeBlock = (people, chain, funds) => {
  const hash = crypto.createHash('sha512');
  const newBlock = {
    people: people,
    previous: chain.head && chain.head.hash || null,
    created_at: new Date().getTime(),
    amount_total: funds.total,
    amount_per_person: funds.per_person
  };

  hash.update(JSON.stringify(newBlock));
  newBlock.hash = hash.digest('hex');

  if (chain.head === null) {
    chain.tail = newBlock;
  }

  chain.head = newBlock;
  chain[newBlock.hash] = newBlock;

  return chain;
};

async function getAllPeople (users, gremlin) {
  const pArray = users.map(async user => {
    const u = await gremlin.V(user.id)
                     .valueMap()
                     .next();
    u.id = user.id;

    return u;
  });

  return await Promise.all(pArray);
}

module.exports = {
  weight,
  getAllPeople,
  forgeBlock
};