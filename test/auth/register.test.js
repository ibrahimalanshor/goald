const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const { createServer } = require('../../lib/gwik/server');
const config = require('../../config/server.config');
const knex = require('../../database/knex');
const UserService = require('../../src/modules/user/user.service');
const userTest = require('./resources/user.json');

describe('resgister test', () => {
  const server = createServer();
  const path = '/register';

  let user;

  before(async () => {
    const userId = await UserService.createUser(userTest);
    user = await UserService.findUserId(userId);

    server.listen();
  });
  after(async () => {
    await UserService.deleteUserId(user.id);

    server.stop();
  });

  it('should return 422', async () => {
    const res = await supertest(config.url).post(path).expect(422);

    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.have.property('email');
    expect(res.body.errors).to.have.property('username');
    expect(res.body.errors).to.have.property('name');
    expect(res.body.errors).to.have.property('password');
    expect(res.body.errors).to.have.property('password_confirmation');
  });

  it('should return 409', async () => {
    await supertest(config.url)
      .post(path)
      .send({
        ...userTest,
        password_confirmation: userTest.password,
      })
      .expect(409);
  });
});
