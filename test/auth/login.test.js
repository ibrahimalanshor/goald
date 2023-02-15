const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const { createServer } = require('../../lib/gwik/server');
const config = require('../../config/server.config');
const UserService = require('../../src/modules/user/user.service');
const userTest = require('./resources/user.json');

describe('login test', () => {
  const server = createServer();
  const path = '/login';

  let existingUserId;

  before(async () => {
    existingUserId = await UserService.createUser(userTest);

    server.listen();
  });

  after(async () => {
    await UserService.deleteUserById(existingUserId);

    server.stop();
  });

  it('should return 422', async () => {
    const res = await supertest(config.url).post(path).expect(422);

    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.have.property('email');
    expect(res.body.errors).to.have.property('password');
  });

  it('should return 401 email not found', async () => {
    await supertest(config.url)
      .post(path)
      .send({
        email: 'error@gmail.com',
        password: 'password',
      })
      .expect(401);
  });

  it('should return 401 password incorrect', async () => {
    await supertest(config.url)
      .post(path)
      .send({
        email: userTest.email,
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('should return access and refresh token', async () => {
    const res = await supertest(config.url)
      .post(path)
      .send(userTest)
      .expect(200);

    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('accessToken');
    expect(res.body.data).to.have.property('refreshToken');
  });
});
