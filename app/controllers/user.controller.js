const userService = require('../services/user.service');
const BaseController = require('./base.controller');
const { handleError } = require('../services/httpResponse.util-service');
const jwtUtilModel = require('../models/jwt.util-model');
const { Manifest, Permission } = require('../models/index.model');
const { constant, statusCode } = require('../constant');
const manifestService = require('../services/manifest.service');

class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  async login(req, res, next) {
    try {
      const result = await userService.findOne(
        { ...req.body },
        {
          model: Manifest,
          attributes: ['id', 'role_name', 'content'],
          // find model Permission associate with manifest
          include: {
            model: Permission,
            // specify attribute will select
            attributes: ['id', 'name'],
            // specify attribute will select in junction table
            through: {
              attributes: [],
            },
          },
          through: {
            attributes: [],
          },
        },
      );
      if (result) {
        return res.status(statusCode.SUCCESS_CODE).json({ data: result, token: jwtUtilModel.genKey(result) });
      }
      return res.status(statusCode.BAD_REQUEST_CODE).send({ msg: constant.BAD_CRIDENTAL });
    } catch (e) {
      handleError(e, res);
    }
  }

  async getFullInfo(req, res, next) {
    try {
      const result = await this.service.getFullInfo();
      return res.status(statusCode.SUCCESS_CODE).json(result);
    } catch (e) {
      handleError(e, res);
    }
  }

  async addManifest(req, res, next) {
    try {
      const result = await this.service.addManifest(req);
      return res.status(200).json(result);
    } catch (e) {
      handleError(e, res);
    }
  }

  async getManifestAndPermission(req, res, next) {
    try {
      const result = await userService.findOne(
        { ...req.params.id },
        {
          model: Manifest,
          attributes: ['role_name', 'content'],
          // find model Permission associate with manifest
          include: {
            model: Permission,
            // specify attribute will select
            attributes: ['name'],
            // specify attribute will select in junction table
            through: {
              attributes: [],
            },
          },
          through: {
            attributes: [],
          },
        },
      );
      return res.status(200).json(result);
    } catch (e) {
      handleError(e, res);
    }
  }

}

module.exports = new UserController();
