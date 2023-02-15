const {
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} = require('gwik');
const { generateToken } = require('../../../lib/jwt/token');
const { compare } = require('../../../lib/bcrypt/bcrypt');
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

async function login(credential) {
  try {
    const user = await UserService.findUserByEmail(credential.email);

    if (!(await compare(credential.password, user.password))) {
      throw new UnauthorizedException({}, 'auth.login.incorrect-password');
    }

    return await generateAuthToken(user.id);
  } catch (err) {
    if (err instanceof NotFoundException) {
      throw new UnauthorizedException({}, 'auth.login.email-not-found');
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
exports.login = login;
