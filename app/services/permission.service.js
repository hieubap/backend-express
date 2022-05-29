const { Permission } = require('../models/index.model');
const BaseService = require('./base.service');

class PermissionService extends BaseService {
	constructor() {
		super(Permission);
	}

	search(whereClause, offset = 0, limit = 10) {
		return Permission.findAndCountAll({ where: {} });
	}

	// more query
}

module.exports = new PermissionService();
