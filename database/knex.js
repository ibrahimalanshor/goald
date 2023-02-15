const knex = require('knex');
const serverConfig = require('../config/server.config');
const config = require('./knexfile');

module.exports = knex(config[serverConfig.mode]);
