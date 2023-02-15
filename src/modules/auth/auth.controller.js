const AuthService = require('./auth.service');

exports.register = async function register({ req }) {
  return await AuthService.register(req.body);
};

exports.login = async function login({ req }) {
  return await AuthService.login(req.body);
};
