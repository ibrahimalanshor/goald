exports.getUsers = function getUsers() {
  return 'Get Users';
};

exports.createUser = function getUsers({ req }) {
  return req.body;
};

exports.updateUserPhoto = function updateUserPhoto({ req }) {
  return req.file;
};
