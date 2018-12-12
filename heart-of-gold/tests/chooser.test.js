// @flow

const { choose } = require('../chooser.js');
const arr = [
  { id: 1 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 6 },
  { id: 5 },
  { id: 5 }
];

test('should select n number of items where n is passed in', async () => {
  for (let i = 0; i < 5; i++) {
    const c = await choose(arr, i);

    expect(c.length).toBe(i);
  }
});

test('should not select the same item more then once', async () => {
  const chosen = await choose(arr, 6);
  const keys = Object.keys(
    chosen.reduce((a, t) => {
      a[t.id] = true;
      return a;
    }, {})
  );

  expect(keys.length).toBe(6);
});
