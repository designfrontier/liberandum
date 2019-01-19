// @flow

import type { APIGatewayEvent, Context } from 'flow-aws-lambda';
import type { Response } from '../common-types/response';

const { weight, getAllPeople } = require('./lib');
const { choose } = require('./chooser');
const { gremlin, gremlinConnection } = require('../shared/db.js');

const round = async (event: APIGatewayEvent, context: Context): Response => {
  const Graph = gremlin.structure.Graph;
  const graph = new Graph();
  const g = graph.traversal().withRemote(gremlinConnection());

  const users = await g
    .V()
    .hasLabel('person')
    .has('opt_in', true)
    .has('phone_number')
    .has('household_size')
    .hasNot('payments')
    .toList();

  const usersWithInfo = await getAllPeople(users, g);

  const weightedUsers = usersWithInfo.reduce(
    (acc, p) => acc.concat(weight(p)),
    []
  );

  const theChosen = await choose(weightedUsers, Math.ceil(users.length / 2));

  console.log(theChosen);

  theChosen.forEach(p => {
    // todo this can probably be an IN style query
    g.V(p.id)
      .property('payments', 1)
      .next();
  });

  return { statusCode: 204 };
};

module.exports = {
  round
};
