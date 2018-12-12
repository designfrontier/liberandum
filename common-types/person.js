// @flow

export type User = {
  name?: string,
  uuid: string,
  phone_number: string,
  opt_in?: boolean,
  household_size?: number,
  has_place_to_stay?: boolean,
  get: Function
};

export type Person = {
  id: string,
  value: User
};
