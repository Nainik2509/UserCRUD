const { OK, CREATED, RECORD_CREATED, RECORDS_FOUND, } = require("../../utils/constants");

const Utilities = require("../../utils/util");
const User = require("../models/user");

var utils = new Utilities();

exports.registerUser = async (req, res, next) => {
  try {
    var objModel = new User(req.body);
    return await objModel.save().then(
      async savedObject => {

        var user = await User.findById({ _id: savedObject._id }).populate(req.body.populate).exec();
        user = user.transform();

        return res
          .status(CREATED)
          .json({ data: user, code: OK, message: RECORD_CREATED });
      },
      async err => {
        throw await utils.checkDuplication(err);
      }
    );
  } catch (error) {
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const savedObject = await User.ValidateUserAndGenerateToken(req.body, req.body.populate);

    return res
      .status(CREATED)
      .json({ data: savedObject, code: OK, message: RECORDS_FOUND });
  } catch (err) {
    return next(err);
  }
};
