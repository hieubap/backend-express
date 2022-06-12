const locationService = require('../services/location.service');
const BaseController = require('./base.controller');
const { handleError } = require('../services/handleError.util-service');
const { messageConst, statusCode, locationStatus } = require('../constant');
const { isEmpty } = require('../utils');

const { BAD_REQUEST_CODE, CREATED_CODE } = statusCode;

class LocationController extends BaseController {
	constructor() {
		super(locationService);
	}

	async changeStatus(req, res, next) {
		if ([locationStatus.TESTING, locationStatus.DE_ACTIVE, locationStatus.ACTIVE].includes(+req.body.status)) {
			const result = await locationService.changeStatusActive(req.id, req.body.status);
			if (!isEmpty(result)) {
				res.status(CREATED_CODE).json({ msg: messageConst.UPDATE_SUCCESS });
			} else {
				res.status(BAD_REQUEST_CODE).json({ msg: messageConst.NOT_FOUND });
			}
		} else return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.NOT_EXIST_ENUM });
	}
}

module.exports = new LocationController();
