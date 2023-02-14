const { ConflictException } = require('gwik');
const UserService = require('../user/user.service');

async function register(user) {
  try {
    await UserService.createUser(user);
  } catch (err) {
    if (err instanceof ConflictException) {
      throw new ConflictException({}, 'auth.register.user-already-exists');
    }

    throw err;
  }
}

exports.register = register;
