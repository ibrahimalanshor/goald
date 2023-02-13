const uploadMiddleware = require('../../../common/middlewares/upload.middleware');

module.exports = uploadMiddleware({
  field: 'photo',
  allowedTypes: ['png', 'PNG', 'jpg'],
  dir: 'users',
  getFilename: ({ req, file }) => file.originalname,
});
