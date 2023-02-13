const { Router } = require('gwik');
const UserController = require('./user.controller');
const UserRequest = require('./requests');

module.exports = [
  new Router('/users').get(UserController.getUsers).build(),
  new Router('/users')
    .middleware(UserRequest.create)
    .post(UserController.createUser)
    .build(),
  new Router('/users/:id/photo')
    .middleware(UserRequest.updatePhoto)
    .patch(UserController.updateUserPhoto)
    .build(),
];
