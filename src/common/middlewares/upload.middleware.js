const path = require('path');
const { createMultipartFormDataMiddleware } = require('gwik');
const serverConfig = require('../../../config/server.config');

module.exports = function uploadMiddleware({
  field,
  allowedTypes,
  dir,
  getFilename,
}) {
  return createMultipartFormDataMiddleware({
    field,
    allowedTypes,
    getPath: () => path.resolve(serverConfig.static.dir, dir || ''),
    getFilename,
  });
};
