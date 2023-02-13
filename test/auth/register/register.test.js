const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const { createServer } = require('../../../lib/gwik/server');
const config = require('../../../config/server.config');

describe('resgister test', () => {
  const server = createServer();
  const path = '/register';

  before(() => server.listen());
  after(() => server.stop());

  it('should return 422', async () => {
    const res = await supertest(config.url).post(path).expect(422);

    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.have.property('email');
    expect(res.body.errors).to.have.property('username');
    expect(res.body.errors).to.have.property('name');
    expect(res.body.errors).to.have.property('password');
    expect(res.body.errors).to.have.property('password_confirmation');
  });

  it('should create new user', async () => {
    const body = {
      email: 'test@gmail.com',
      username: 'test',
      name: 'Test',
      password: 'password',
      password_confirmation: 'password',
    };
    const res = await supertest(config.url).post(path).send(body).expect(201);

    console.log(res.body);
  });
});
