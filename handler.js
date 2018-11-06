'use strict';
const { round } = require('./heart-of-gold');
const { twilioHook, addUser } = require('./marvin');

const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports = {
  hello,
  twilioHook,
  "add-user": addUser,
  'round': round
};
