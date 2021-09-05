const {
  CREATED,
  RECORD_CREATED,
  RECORD_UPDATED,
  RECORD_DELETED,
  OK,
  NOT_FOUND,
  RECORDS_FOUND,
  NO_RECORD_FOUND
} = require("../../utils/constants");
const Utilities = require("../../utils/util");
const APIError = require("../../utils/APIError");
const fs = require("fs");

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_WoaI71FWliZWZRMss+P7ru/Vw+o=",
  privateKey: "private_QfVHw5KWn3UgbwJFd3gYfqA3PzM=",
  urlEndpoint: "https://ik.imagekit.io/tasknainik"
});

class AppController {
  constructor (model) {
    this._model = model;
    this.reservedVars = [
      "populate",
      "populateMap",
      "fields",
      "page",
      "perPage",
      "counter",
      "asc",
      "dsc",
      "query"
    ];
    this.utils = new Utilities();
    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.mapList = this.mapList.bind(this);
  }

  async add(req, res, next) {
    try {
      var objModel = new this._model(req.body);
      await objModel.save().then(
        savedObject => {
          savedObject = savedObject.transform();
          return res
            .status(CREATED)
            .json({ data: savedObject, code: OK, message: RECORD_CREATED });
        },
        async err => {
          throw await this.utils.checkDuplication(err);
        }
      );
    } catch (error) {
      return next(error);
    }
  }

  async mapList(req, res, next) {
    try {
      let whereIsMyData = this.removeReservedVars(req.query, this.reservedVars);
      let page = parseInt(req.query.page) || 0;
      let limit = parseInt(req.query.perPage) || 10;
      let asc = this.getFieldAsArray(req.query.asc) || [];
      let dsc = this.getFieldAsArray(req.query.dsc) || [];
      let populateMap = req.body.populateMap || [];
      var assort = {};
      asc.forEach(elem => {
        assort[elem] = 1;
      });
      dsc.forEach(elem => {
        assort[elem] = -1;
      });

      if (!req.query.perPage) {
        page = undefined;
        limit = undefined;
      }

      await this._model
        .find(whereIsMyData)
        .sort(assort)
        .skip(page * limit)
        .limit(limit)
        .populate(populateMap)
        .then(
          async savedObject => {

            if (req.query.counter)
              var count = await this._model.countDocuments(whereIsMyData);
            return res.status(CREATED).json({
              data: savedObject,
              code: OK,
              count,
              message: savedObject.length > 0 ? RECORDS_FOUND : NO_RECORD_FOUND
            });
          },
          async err => {
            throw err;
          }
        );
    } catch (error) {
      return next(error);
    }
  }

  async get(req, res, next) {
    var _id = req.params.id;
    let include = this.getFieldAsArray(req.query.populate);
    try {
      await this._model
        .findOne({ _id })
        .populate(include)
        .then(
          updated => {
            updated = updated.transform();
            return res
              .status(CREATED)
              .json({ data: updated, code: OK, message: RECORDS_FOUND });
          },
          async err => {
            throw new APIError({
              errors: [err],
              message: NO_RECORD_FOUND,
              status: NOT_FOUND
            });
          }
        );
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    var _id = req.params.id;

    try {
      await this._model
        .findOneAndUpdate({ _id }, req.body, { new: true })
        .populate(req.body.populateMap)
        .then(
          updated => {
            updated = updated.transform();
            return res
              .status(CREATED)
              .json({ data: updated, code: OK, message: RECORD_UPDATED });
          },
          async err => {
            throw await this.utils.checkDuplication(err);
          }
        );
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    var _id = req.params.id;
    try {
      await this._model.findOne({ _id }).then(
        updated => {
          if (updated != null) {
            updated = updated.remove();
            return res
              .status(CREATED)
              .json({ data: updated, code: OK, message: RECORD_DELETED });
          }
          throw new APIError({
            message: NO_RECORD_FOUND,
            status: NOT_FOUND
          });
        },
        async err => {
          throw new APIError({
            errors: [err],
            message: NO_RECORD_FOUND,
            status: NOT_FOUND
          });
        }
      );
    } catch (error) {
      return next(error);
    }
  }

  allParsed(allWhereIs) {
    let returnable = {};
    Object.keys(allWhereIs)
      .forEach((key) => {
        if (this.isJson(allWhereIs[key])) {
          returnable[key] = JSON.parse(allWhereIs[key]);
        } else {
          returnable[key] = allWhereIs[key];
        }
      });
    return returnable;
  }

  removeReservedVars(queries, dissolvers) {
    return Object.keys(queries)
      .filter(obj => dissolvers.indexOf(obj) === -1)
      .filter(obj => !obj.startsWith("$"))
      .reduce((obj, key) => {
        obj[key] = queries[key];
        return obj;
      }, {});
  }

  getFieldAsArray(field) {
    return field ? field.split(",").map(item => item.trim()) : undefined;
  }

  async uploadImageKitIo(req, res, next) {

    try {
      const aa = await fs.createReadStream(req.file.path);
      const result = await imagekit.upload({
        file: aa, //required
        fileName: req.file.filename, //required
      });

      var path = result.url;
      return res
        .status(CREATED)
        .json({ data: path, code: OK, message: RECORD_CREATED });

    } catch (error) {
      console.log(error)
      return next(error);
    }
  }
}

module.exports = AppController;
