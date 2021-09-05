const { VALIDATION_ERROR, BAD_REQUEST } = require("./constants");
const APIError = require("./APIError");


class Utilities {
  constructor () {
    this.digits = "0123456789";
    this.alphabets = "abcdefghijklmnopqrstuvwxyz";
    this.upperCase = this.alphabets.toUpperCase();
    this.specialChars = "#!&@";
  }


  capital_letter(str) {
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
    }
    return str.join(" ");
  }

  async checkDuplication(error) {
    if (
      error.code === 11000 &&
      (error.name === "BulkWriteError" || error.name === "MongoError")
    ) {
      const keys = Object.keys(error.keyPattern);
      var errors = [];
      keys.forEach(key => {
        errors.push({
          field: key,
          location: "user",
          messages:
            key
              .toLowerCase()
              .split("_")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") + " already in use."
        });
      });

      if (errors.length > 0) {
        var arr = new APIError({
          message: VALIDATION_ERROR,
          status: BAD_REQUEST,
          errors
        });
        return arr;
      }
    }
    return error;
  }

  rand(min, max) {
    const random = Math.random();
    return Math.floor(random * (max - min) + min);
  }

  generate(length, options) {
    length = length || 10;
    const generateOptions = options || {};

    generateOptions.digits = Object.prototype.hasOwnProperty.call(
      generateOptions,
      "digits"
    )
      ? options.digits
      : true;
    generateOptions.alphabets = Object.prototype.hasOwnProperty.call(
      generateOptions,
      "alphabets"
    )
      ? options.alphabets
      : false;
    generateOptions.upperCase = Object.prototype.hasOwnProperty.call(
      generateOptions,
      "upperCase"
    )
      ? options.upperCase
      : false;
    generateOptions.specialChars = Object.prototype.hasOwnProperty.call(
      generateOptions,
      "specialChars"
    )
      ? options.specialChars
      : false;

    const allowsChars =
      ((generateOptions.digits || "") && this.digits) +
      ((generateOptions.alphabets || "") && this.alphabets) +
      ((generateOptions.upperCase || "") && this.upperCase) +
      ((generateOptions.specialChars || "") && this.specialChars);

    let password = "";

    while (password.length < length) {
      const charIndex = this.rand(0, allowsChars.length - 1);
      password += allowsChars[charIndex];
    }
    return password;
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
module.exports = Utilities;
