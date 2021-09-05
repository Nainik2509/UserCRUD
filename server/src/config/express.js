const express = require("express");
const path = require("path");
const helmet = require("helmet");
const passport = require("passport");
const compress = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const AppError = require("../utils/appError");
const globalErrorHandler = require("../utils/errorController");

const { ErrorHandler, ConvertError, NotFound } = require("../middleware/error");
const { logs, morganConfig } = require("./env-vars");
const { Jwt } = require("./passport");

const app = express();

app.enable("trust proxy");
app.use(morgan(logs, morganConfig));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(compress());

// PUT | DELETE => In places where the client doesn't support it
app.use(methodOverride());

// Static assets directory setup
app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", Jwt);

app.use("/api/v1", require("../api/routes"));

app.use(ConvertError);
app.use(globalErrorHandler);
app.use(ErrorHandler);
app.use(NotFound);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


module.exports = app;
