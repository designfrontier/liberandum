// @flow

import type { APIGatewayEvent, Context } from 'flow-aws-lambda';
import type { Response } from '../common-types/response';

const errors = async (event: APIGatewayEvent, context: Context): Response => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    })
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports = errors;
