exports.validatePort = function validatePort(port) {
  const portNumber = parseInt(port);

  return isNaN(portNumber) ? 4000 : portNumber;
};

exports.stringToBoolean = function stringToBoolean(logging) {
  return typeof logging === 'string' ? logging === 'true' : logging;
};
