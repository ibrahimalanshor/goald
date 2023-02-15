const { ConflictException } = require('gwik');
const { generateToken } = require('../../../lib/jwt/token');
const UserService = require('../user/user.service');

async function register(user) {
  try {
    const userId = await UserService.createUser(user);

    return await generateAuthToken(userId);
  } catch (err) {
    if (err instanceof ConflictException) {
      throw new ConflictException({}, 'auth.register.user-already-exists');
    }

    throw err;
  }
}

async function generateAuthToken(userId) {
  return {
    accessToken: await generateToken({ id: userId }, { expiresIn: '15m' }),
    refreshToken: await generateToken({ id: userId }, { expiresIn: '30d' }),
  };
}

exports.register = register;
