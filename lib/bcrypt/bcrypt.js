const bcrypt = require('bcrypt');

exports.hash = async function hash(string) {
  return await bcrypt.hash(string, 10);
};

exports.compare = async function compare(string, hash) {
  return await bcrypt.compare(string, hash);
};
