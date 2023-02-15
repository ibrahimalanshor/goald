const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const { createServer } = require('../../lib/gwik/server');
const { verifyToken } = require('../../lib/jwt/token');
const config = require('../../config/server.config');
const UserService = require('../../src/modules/user/user.service');
const userTest = require('./resources/user.json');

describe('resgister test', () => {
  const server = createServer();
  const path = '/register';

  let existingUserId;
  let registeredUserId;

  before(async () => {
    existingUserId = await UserService.createUser(userTest);

    server.listen();
  });

  after(async () => {
    await UserService.deleteUserId(existingUserId);
    await UserService.deleteUserId(registeredUserId);

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

  it('should return access and refresh token', async () => {
    const res = await supertest(config.url)
      .post(path)
      .send({
        username: 'user',
        name: 'User',
        email: 'user@gmail.com',
        password: 'password',
        password_confirmation: 'password',
      })
      .expect(201);

    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('accessToken');
    expect(res.body.data).to.have.property('refreshToken');

    const jwtEncoded = await verifyToken(res.body.data.accessToken);

    registeredUserId = jwtEncoded.id;
  });
});
