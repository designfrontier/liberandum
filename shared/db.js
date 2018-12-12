// @flow
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const uri = process.env.GREMLIN_URI || '';

module.exports = {
  gremlin,
  gremlinConnection: () => {
    return new DriverRemoteConnection(`${uri}/gremlin`);
  }
};
