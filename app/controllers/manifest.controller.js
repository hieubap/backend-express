const manifestService = require('../services/manifest.service');
const BaseController = require('./base.controller');
const {handleError} = require("../services/httpResponse.util-service");

class ManifestController extends BaseController {
	constructor() {
		super(manifestService);
	}
  async addPermission(req, res, next) {
    try {
      const result = await this.service.addPermission(req);
      return res.status(200).json(result);
    } catch (e) {
      handleError(e, res);
    }
  }
}
module.exports = new ManifestController();
