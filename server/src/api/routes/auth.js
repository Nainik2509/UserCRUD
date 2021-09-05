const Validate = require("express-validation");

const { Login, Register, } = require("../validations/auth");
const controller = require("../controller/auth");
const app = require("express").Router();

app.route("/register").post(Validate(Register), controller.registerUser);

app.route("/login").post(Validate(Login), controller.loginUser);

module.exports = app;
