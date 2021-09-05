const { AUTH_ROLES, STATUSES } = require("../../utils/constants");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  // POST /v1/auth/register
  Register: {
    body: {
      first_name: Joi.string().required().min(2).max(126),
      last_name: Joi.string().required().min(2).max(126),
      username: Joi.string().required().min(2).max(126),
      password: Joi.string().required().min(6).max(128),
      status: Joi.string().valid(STATUSES),
      role: Joi.string().valid(AUTH_ROLES),
    }
  },

  // POST /v1/auth/login
  Login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required().min(6).max(128)
    }
  },

};
