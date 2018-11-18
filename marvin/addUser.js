'use strict';
const { gremlin, gremlinConnection } = require('../shared/db.js'),
      Twilio = require('twilio'),
      uuid = require('uuid/v4'),
      client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN),
      message = 'You have been invited to liberandum! \n We are working to help people get out of the disaster zone. In order to setup your account we need to ask you a few questions. If interested please respond with YES';

const addUser = async (event, context) => {
  const body = JSON.parse(event.body),
        phone = body.phone,
        suggestingPhone = body.From,
        Graph = gremlin.structure.Graph,
        graph = new Graph(),
        g = graph.traversal().withRemote(gremlinConnection());

  const user = await g.V()
                        .limit(1)
                        .hasLabel('person')
                        .has('phone_number', phone)
                        .toList();

  const suggestor = await g.V()
                        .limit(1)
                        .hasLabel('person')
                        .has('phone_number', suggestingPhone)
                        .toList();

  if (suggestor.length === 0 && event.queryStringParameters && !event.queryStringParameters.bypass) {
    console.log(`unknown number ${suggestingPhone} tried to suggest ${phone}`);
    return {statusCode: 204};
  }

  if(user.length === 0) {
    // we've never seen you before... add you!
    const p = g.addV('person')
     .property('phone_number', phone)
     .property('uuid', uuid())
     .property('invited_by', suggestingPhone)
     .next();

    if (event.queryStringParameters && !event.queryStringParameters.bypass) {
      //add edge
      g.addE('invited')
       .from(suggestor)
       .to(p);
    }

    client
      .messages
      .create({
        body: message,
        to: phone,
        from: process.env.TWILIO_ACCOUNT_NUMBER
      });

    console.log({
      statusCode: 200,
      body: JSON.stringify({
        message: '[new user]',
        input: { timestamp: new Date(), ...event },
      }),
    });
  } else {
    // we know you
    console.log({
      statusCode: 200,
      body: JSON.stringify({
        message: '[attempted new user for known user]',
        input: { timestamp: new Date(), ...event },
      })
    });
  }

  return { statusCode: 204 };
};

module.exports = addUser;