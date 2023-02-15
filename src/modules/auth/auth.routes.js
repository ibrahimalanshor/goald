const { Router } = require('gwik');
const AuthController = require('./auth.controller');
const AuthRequest = require('./requests');

module.exports = [
  new Router('/register')
    .middleware(AuthRequest.register)
    .post(AuthController.register, 200)
    .build(),
  new Router('/login')
    .middleware(AuthRequest.login)
    .post(AuthController.login, 200)
    .build(),
];
