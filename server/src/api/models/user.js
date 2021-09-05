const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const { AUTH_ROLES, INVALID_CREDENTIALS, BAD_REQUEST, EMAIL_NOT_FOUND, STATUSES, NOT_FOUND } = require("../../utils/constants");
const { saltRound, jwtExpirationInterval, jwtSecret } = require("../../config/env-vars");
const APIError = require("../../utils/APIError");
const Utilities = require("../../utils/util");
const Jwt = require("jsonwebtoken");

const UserModel = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter your first name!"],
      trim: true,
      minlength: 2,
      maxlength: 126
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name!"],
      trim: true,
      minlength: 2,
      maxlength: 126
    },
    username: {
      type: String,
      required: [true, "Please enter your username!"],
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 126
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6
    },
    role: {
      type: String,
      enum: {
        values: AUTH_ROLES,
        message: "User status is either: Customer or Administrator"
      },
      lowercase: true,
      default: "customer"
    },
    avatar: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: "User status is either: active, deactive, or blocked"
      },
      lowercase: true,
      default: "active"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const utils = new Utilities();

UserModel.statics = {
  async ValidateUserAndGenerateToken(options, populate) {
    const { username, password } = options;
    var condition = {};
    condition = { username }
    const user = await this.findOne(condition)
      .populate(populate)
      .exec();
    if (!user) {
      throw new APIError({
        message: EMAIL_NOT_FOUND,
        status: NOT_FOUND
      });
    }
    if (!(await user.matchPassword(password))) {
      throw new APIError({
        message: INVALID_CREDENTIALS,
        status: BAD_REQUEST
      });
    }
    return user.transform();
  },
};

UserModel.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, Number(saltRound));
    this.password = hash;

    this.first_name ? (this.first_name = await utils.capital_letter(this.first_name)) : this.first_name;
    this.last_name ? (this.last_name = await utils.capital_letter(this.last_name)) : this.last_name;

    return next();
  } catch (err) {
    return next(err);
  }
});


UserModel.virtual('fullName').get(function () {
  return this.first_name + " " + this.last_name;
});

UserModel.method({
  transform() {
    var res = this._doc
    res.token = this.token();
    res.fullName = this.first_name + " " + this.last_name;
    return res;
  },
  token() {
    const payload = {
      exp: moment()
        .add(jwtExpirationInterval, "minutes")
        .unix(),
      iat: moment().unix(),
      sub: this._id,
      status: this.status
    };
    return Jwt.sign(payload, jwtSecret);
  },
  async matchPassword(password) {
    return bcrypt.compare(password, this.password);
  }
});

module.exports = model("user", UserModel);
