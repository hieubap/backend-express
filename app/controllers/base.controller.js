const { handleError } = require('../services/httpResponse.service');
const constant = require('../assets/constant');

class BaseController {
	constructor(service) {
		this.service = service;
	}
	async search(req, res, next) {
		try {
			const result = await this.service.search(req.params);
			return res.status(200).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}
	async detail(req, res, next) {
		try {
			const result = await this.service.search(req.params.id);
			return res.status(200).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}
	async insert(req, res, next) {
		try {
			await this.service.insert(req.body);
			return res.status(200).json(constant.INSERT_SUCCESS);
		} catch (e) {
			handleError(e, res);
		}
	}
	async update(req, res, next) {
		try {
			await this.service.update(req.body, { id: req.params.id });
			return res.status(200).json(constant.UPDATE_SUCCESS);
		} catch (e) {
			handleError(e, res);
		}
	}
	async delete(req, res, next) {
		try {
			await this.service.delete({ id: req.params.id });
			return res.status(200).json(constant.DELETE_SUCCESS);
		} catch (e) {
			handleError(e, res);
		}
	}
}
module.exports = BaseController;
