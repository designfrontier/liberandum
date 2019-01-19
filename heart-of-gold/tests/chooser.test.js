// @flow
import type { User } from '../../common-types/person';

const { choose } = require('../chooser.js');
const user: User = {
  uuid: 'its-unique-ish',
  phone_number: '12345678900',
  get: () => {}
};
const arr = [
  { id: '1', value: user },
  { id: '1', value: user },
  { id: '2', value: user },
  { id: '3', value: user },
  { id: '4', value: user },
  { id: '5', value: user },
  { id: '6', value: user },
  { id: '6', value: user },
  { id: '5', value: user },
  { id: '5', value: user }
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
