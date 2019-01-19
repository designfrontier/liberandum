// @flow

export type Response = Promise<{
  statusCode: number,
  body?: string
}>;
