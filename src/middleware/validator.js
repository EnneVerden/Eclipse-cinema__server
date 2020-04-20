const UnprocessableEntityError = require("../errors/unprocessable-entity");

const validate = (obj, schema) => {
  if (schema) {
    const validator = schema.validate(obj);

    if (validator.error) {
      throw new UnprocessableEntityError(
        `Wrong data: ${validator.error.details[0].message}`
      );
    }
  }
};

module.exports = (schema) => (req, res, next) => {
  validate(req.body, schema.body);
  validate(req.params, schema.params);
  validate(req.query, schema.query);
  next();
};
