const { createBodyValidationMiddleware, body } = require('gwik');
const confirmed = require('../../../common/validator/confirmed.validator');

module.exports = createBodyValidationMiddleware([
  body('email')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty')
    .isEmail()
    .bail()
    .withMessage('validation.email'),
  body('username')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty')
    .isAlphanumeric()
    .bail()
    .withMessage('validation.alphanumeric'),
  body('name')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty')
    .isAlphanumeric('en-US', { ignore: ' ' })
    .bail()
    .withMessage('validation.alphanumeric'),
  body('password')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty')
    .isLength({ min: 6 })
    .bail()
    .withMessage('validation.length')
    .custom(confirmed('password_confirmation')),
  body('password_confirmation')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty'),
]);
