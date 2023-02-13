module.exports = function confirmed(field) {
  return (value, { req }) => {
    if (value !== req.body[field]) throw new Error('validation.confirmed');

    return true;
  };
};
