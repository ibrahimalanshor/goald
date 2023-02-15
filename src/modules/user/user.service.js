const { ConflictException } = require('gwik');
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

async function findUserId(id) {
  return await knex('users').where('id', id).first();
}

async function deleteUserId(id) {
  return await knex('users').where('id', id).delete();
}

exports.createUser = createUser;
exports.findUserId = findUserId;
exports.deleteUserId = deleteUserId;
