const path = require('path');
const { validatePort, stringToBoolean } = require('./helpers/validate.helper');

const mode = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

require('dotenv').config({
  path: path.resolve(__dirname, '../', `.env.${mode}`),
});

module.exports = {
  mode,
  port: validatePort(process.env.SERVER_PORT) || 4000,
  url: process.env.SERVER_URL || 'http://localhost:4000',
  logging: stringToBoolean(process.env.SERVER_LOGGING) ?? true,
  static: {
    path: process.env.SERVER_STATIC_PATH || '/public',
    dir: path.resolve(
      __dirname,
      '../',
      process.env.SERVER_STATIC_DIR || 'public'
    ),
  },
  translation: {
    defaultLocale: process.env.SERVER_DEFAULT_LOCALE || 'en',
    defaultFallbackLocale: process.env.SERVER_DEFAULT_FALLBACK_LOCALE || 'en',
  },
};
