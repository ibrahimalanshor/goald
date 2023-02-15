const { createBodyValidationMiddleware, body } = require('gwik');

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
  body('password')
    .exists()
    .bail()
    .withMessage('validation.exists')
    .notEmpty()
    .bail()
    .withMessage('validation.empty')
    .isLength({ min: 6 })
    .bail()
    .withMessage('validation.length'),
]);
