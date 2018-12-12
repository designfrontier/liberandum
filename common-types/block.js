// @flow
import type { Person } from './person';

export type Block = {
  people: Array<Person>,
  previous: string | null,
  signature: string,
  created_at: number,
  amount_total: number,
  amount_per_person: number
};

export type Chain = {
  head: Block,
  tail: Block,
  [name: string]: Block
};
