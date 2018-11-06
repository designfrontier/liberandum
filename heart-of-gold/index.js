'use strict';
const libpostal = require('node-postal'),
      queryString = require('query-string'),
      Twilio = require('twilio'),
      { weight, getAllPeople } = require('./lib'),
      { choose } = require('./chooser'),
      client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN),
      { gremlin, gremlinConnection } = require('../shared/db.js');

const round = async (event, context) => {
  const Graph = gremlin.structure.Graph;
  const graph = new Graph();
  const g = graph.traversal().withRemote(gremlinConnection());

  const users = await g.V()
                        .hasLabel('person')
                        .has('opt_in', true)
                        .has('phone_number')
                        .has('household_size')
                        .hasNot('payments')
                        .toList();

  const usersWithInfo = await getAllPeople(users, g);

  const weightedUsers = usersWithInfo.reduce((acc, p) => acc.concat(weight(p)), []);

  const theChosen = await choose(weightedUsers, Math.ceil(users.length / 2));

  console.log(theChosen);

  theChosen.forEach((p) => { //todo this can probably be an IN style query
    g.V(p.id)
     .property('payments', 1)
     .next();
  });

  return { statusCode: 204 };
};

module.exports = {
  round
};