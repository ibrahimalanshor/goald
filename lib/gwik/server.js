const { Server } = require('gwik');
const serverConfig = require('../../config/server.config');
const routes = require('../../src/routes');
const messages = require('../../resources/messages');

exports.createServer = function createServer() {
  const server = new Server({
    port: serverConfig.port,
    logging: serverConfig.logging,
    t9n: {
      locale: serverConfig.translation.defaultLocale,
      fallbackLocale: serverConfig.translation.defaultFallbackLocale,
      messages,
    },
  });

  server.addStaticRoute(serverConfig.static.path, serverConfig.static.dir);
  server.addRoute(routes);

  return server;
};
