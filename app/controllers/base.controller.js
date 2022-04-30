const { handleError } = require('../services/httpResponse.util-service');
const constant = require('../constant');
const Exception = require('../models/exception.util-model');

class BaseController {
	constructor(service) {
		this.service = service;
	}
	async search(req, res, next) {
		try {
			const { limit = 10, offset = 0, ...rest } = req.query;
			if (isNaN(+limit) || isNaN(+offset)) {
				throw new Exception(constant.PARAMS_NUMBER_REQUIRED, constant.PARAMS_NUMBER_REQUIRED);
			}

			const result = await this.service.search(rest, +offset, +limit);
			return res.status(200).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}
	async detail(req, res, next) {
		try {
			const result = await this.service.detail(req.params.id);
			return res.status(200).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}
	async insert(req, res, next) {
		try {
			const createdModel = await this.service.insert(req.body);
			return res.status(200).json({ msg: constant.INSERT_SUCCESS, content: createdModel });
		} catch (e) {
			handleError(e, res);
		}
	}
	async batchInsert(req, res, next) {
		try {
			await this.service.batchInsert(req.body);
			return res.status(200).json({ msg: constant.BATCH_INSERT_SUCCESS });
		} catch (e) {
			handleError(e, res);
		}
	}
	async update(req, res, next) {
		try {
			const updatedModel = await this.service.update(req.body, { id: req.params.id });
			console.log(updatedModel);
			return res.status(200).json({ msg: constant.UPDATE_SUCCESS, content: updatedModel });
		} catch (e) {
			handleError(e, res);
		}
	}
	async delete(req, res, next) {
		try {
			await this.service.delete({ id: req.params.id });
			return res.status(200).json({ msg: constant.DELETE_SUCCESS, deleted_id: req.params.id });
		} catch (e) {
			handleError(e, res);
		}
	}
}
module.exports = BaseController;
