const gremlin = require('gremlin'),
      DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

module.exports = {
  gremlin,
  gremlinConnection: () => {
  	return new DriverRemoteConnection(`${process.env.GREMLIN_URI}/gremlin`);
  }
};
