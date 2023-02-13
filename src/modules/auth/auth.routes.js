const { Router } = require('gwik');
const AuthController = require('./auth.controller');
const AuthRequest = require('./requests');

module.exports = [
  new Router('/register')
    .middleware(AuthRequest.register)
    .post(AuthController.register)
    .build(),
];
