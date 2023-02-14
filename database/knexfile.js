// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'ibrahimalanshor',
      password: '1br4h1mk3c3',
      database: 'goald',
    },
    migrations: {
      tableName: 'migrations',
    },
  },
};
