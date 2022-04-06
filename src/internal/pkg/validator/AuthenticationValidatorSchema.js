const Joi = require('joi');

const PostAuthenticationPayloadScehma = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PuthAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// Put dan Delete dipisah karena bisa saja kedepannya berbeda

module.exports = {
  PostAuthenticationPayloadScehma,
  PuthAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
