const AuthService = require('./auth.service');

exports.register = async function register({ req }) {
  return await AuthService.register(req.body);
};
