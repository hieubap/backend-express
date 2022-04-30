const { User } = require('../models/index.model');
const BaseService = require('./base.service');

class UserService extends BaseService {
	constructor() {
		super(User);
	}
	getFullInfo(req) {
		User.getManifest();
	}
	// more query
}
module.exports = new UserService();
