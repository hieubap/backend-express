const { SensorDevice, Location, sequelize } = require('../models/index.model');
const BaseService = require('./base.service');
const { functionReturnCode } = require('../constant');
const { handleError } = require('./handleError.util-service');

class SensorDeviceService extends BaseService {
	constructor() {
		super(SensorDevice);
	}

	async insert(model, res) {
		if (model.is_active !== 1) {
			model.is_active = 0;
		}
		const locationId = model.location_id;
		if (!locationId) {
			try {
				await SensorDevice.create(model);
				return functionReturnCode.SUCCESS;
			} catch (e) {
				return functionReturnCode.CATCH_ERROR;
			}
		}
		const t = await sequelize.transaction();
		try {
			const location = await Location.findByPk(locationId);
			if (!location) {
				return functionReturnCode.REF_NOT_FOUND;
			} else {
				const createdSensor = await SensorDevice.create(model, { transaction: t });
				createdSensor.setLocation(location);
				await t.commit();
				return functionReturnCode.SUCCESS;
			}
		} catch (e) {
			await t.rollback();
			handleError(e, res);
			return functionReturnCode.CATCH_ERROR;
		}
	}
}

module.exports = new SensorDeviceService();
