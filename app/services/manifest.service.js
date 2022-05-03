const { Manifest } = require('../models/index.model');
const BaseService = require('./base.service')


class ManifestService extends BaseService {
	constructor() {
		super(Manifest);
	}

  // more query
}

module.exports = new ManifestService();
