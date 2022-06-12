const sensorDeviceService = require('../services/sensorDevice.service');
const BaseController = require('./base.controller');
const { handleError } = require('../services/handleError.util-service');
const { messageConst, statusCode } = require('../constant');
const { BAD_REQUEST_CODE } = statusCode;

class SensorDeviceController extends BaseController {
	constructor() {
		super(sensorDeviceService);
	}

	async insert(req, res, next) {
		try {
			if (req.id) {
				req.body.created_id = req.id;
			}
			const result = await this.service.insert(req.body, res);
			BaseController.checkServiceResult(result, res, 'Tạo mới thiết bị thành công');
		} catch (e) {
			handleError(e, res);
		}
	}
}

module.exports = new SensorDeviceController();
