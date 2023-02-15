const bcrypt = require('bcrypt');

exports.hash = async function hash(string) {
  return await bcrypt.hash(string, 10);
};
