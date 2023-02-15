const jwt = require('jsonwebtoken');
const serverConfig = require('../../config/server.config');

exports.generateToken = async function generateToken(payload, options = {}) {
  return await jwt.sign(payload, serverConfig.key, {
    expiresIn: options.expiresIn,
  });
};

exports.verifyToken = async function verifyToken(token) {
  return await jwt.verify(token, serverConfig.key);
};
