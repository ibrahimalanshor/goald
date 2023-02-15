const { ConflictException, NotFoundException } = require('gwik');
const knex = require('../../../database/knex');
const { hash } = require('../../../lib/bcrypt/bcrypt');

async function createUser(user) {
  try {
    const [id] = await knex('users').insert({
      email: user.email,
      name: user.name,
      username: user.username,
      password: await hash(user.password),
    });

    return id;
  } catch (err) {
    if (err.errno === 1062) {
      throw new ConflictException();
    }

    throw err;
  }
}

async function findUser(column, value) {
  const user = await knex('users').where(column, value).first();

  if (!user) throw new NotFoundException();

  return user;
}

async function findUserById(id) {
  return await findUser('id', id);
}

async function findUserByEmail(email) {
  return await findUser('email', email);
}

async function deleteUserById(id) {
  return await knex('users').where('id', id).delete();
}

exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.deleteUserById = deleteUserById;
