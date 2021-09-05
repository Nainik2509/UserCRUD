const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../api/models/user");
const { jwtSecret } = require("./env-vars");

const JwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
};

const JWT = async (payload, done) => {
  try {
    var condition = {
      $and: [
        {
          _id: payload.sub
        },
        {
          status: payload.status
        }
      ]
    };
    const user = await User.findOne(condition);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

exports.Jwt = new Strategy(JwtOptions, JWT);
