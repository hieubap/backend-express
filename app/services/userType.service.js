const { UserType } = require('../models/index.model');
const BaseService = require('./base.service');

class UserTypeService extends BaseService {
	constructor() {
		super(UserType);
	}

	search(whereClause, offset = 0, limit = 10) {
		const excludeAttribute = ['deleted_at'];
		return super.search(whereClause, offset, limit, excludeAttribute);
	}
}

module.exports = new UserTypeService();
