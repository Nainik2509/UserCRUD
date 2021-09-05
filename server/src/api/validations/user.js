const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { AUTH_ROLES } = require("../../utils/constants");

module.exports = {
  // GET /v1/user/list
  list: {
    query: {
      page: Joi.number().min(0),
      perPage: Joi.number()
        .min(1)
        .max(50),
      email: Joi.string().email(),
      role: Joi.string().valid(AUTH_ROLES)
    }
  },


  // GET /v1/user/:id
  get: {
    params: {
      id: Joi.objectId().required()
    }
  },

  // POST /v1/user/:id
  update: {
    params: {
      id: Joi.objectId().required()
    }
  },
};
