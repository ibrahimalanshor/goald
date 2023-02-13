const { createBodyValidationMiddleware, body } = require('gwik');
const confirmed = require('../../../common/validator/confirmed.validator');

module.exports = createBodyValidationMiddleware([
  body('name').exists(),
  body('password').exists().custom(confirmed('password_confirmation')),
]);
