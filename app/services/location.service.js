const { Location } = require('../models/index.model');
const BaseService = require('./base.service');

class LocationService extends BaseService {
	constructor() {
		super(Location);
	}

	changeStatusActive(id, status) {
		return Location.update(
			{ status },
			{
				where: {
					id,
				},
			},
		);
	}
}

module.exports = new LocationService();
