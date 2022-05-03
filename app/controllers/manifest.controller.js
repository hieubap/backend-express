const manifestService = require('../services/manifest.service');
const BaseController = require('./base.controller');

class ManifestController extends BaseController {
	constructor() {
		super(manifestService);
	}
}
module.exports = new ManifestController();
