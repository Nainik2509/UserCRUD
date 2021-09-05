const app = require("express").Router();
const Validate = require("express-validation");
const AppController = require("../controller/base");
const model = require("../models/user");
const { Authorize } = require("../../middleware/auth");
const {
  update
} = require("../validations/user");
const { LOGGED_IN } = require("../../utils/constants");

const controller = new AppController(model);

app.route("/map/list").post(Authorize(LOGGED_IN), controller.mapList);

app.route("/:id").post(Authorize(LOGGED_IN), Validate(update), controller.update)

module.exports = app;
