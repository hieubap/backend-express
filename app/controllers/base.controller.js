const { handleError } = require('../services/handleError.util-service');
const { messageConst, statusCode, functionReturnCode } = require('../constant');
const Exception = require('../models/exception.util-model');
const { sequelize, Permission } = require('../models/index.model');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');

const { SERVER_ERROR_CODE, BAD_REQUEST_CODE, SUCCESS_CODE } = statusCode;
const { CATCH_ERROR, EXPIRED, NOT_FOUND, SUCCESS, VOID, PARAM_REQUIRED } = functionReturnCode;

class BaseController {
	constructor(service) {
		this.service = service;
	}

	static checkRequestPermission(userId) {
		if (isNaN(+userId)) return [];
		else {
			return sequelize.query(
				'select permission.id , permission.name from permission\n' +
					'join manifest_ref_permission mrp on permission.id = mrp.permission_id\n' +
					'join user_ref_manifest urm on mrp.manifest_id = urm.manifest_id\n' +
					'where user_id = :userId',
				{
					replacements: { userId },
					type: QueryTypes.SELECT,
					model: Permission,
					raw: true,
					nest: true,
					mapToModel: true, // pass true here if you have any mapped fields
				},
			);
		}
	}

	static checkServiceResult(result, res, successMsg) {
		if (result === SUCCESS) {
			return res.status(SUCCESS_CODE).json({ status: 'ok', msg: successMsg || 'Thành công' });
		}
		if (result === NOT_FOUND) {
			return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.NOT_FOUND });
		}
		if (result === CATCH_ERROR) {
			return res.status(SERVER_ERROR_CODE).json({ msg: messageConst.SERVER_ERROR });
		}
		if (isNaN(result)) {
			return res.status(BAD_REQUEST_CODE).json({ msg: result + ' required' });
		}
	}

	async search(req, res, next) {
		try {
			const { limit = 10, offset = 0, ...rest } = req.query;
			if (isNaN(+limit) || isNaN(+offset)) {
				throw new Exception(messageConst.PARAMS_NUMBER_REQUIRED, messageConst.PARAMS_NUMBER_REQUIRED);
			}
			Object.keys(rest).forEach((key) => {
				rest[key] = {
					[Op.like]: `${rest[key]}%`,
				};
			});
			const result = await this.service.search(rest, +offset, +limit);
			return res.status(statusCode.SUCCESS_CODE).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}

	async detail(req, res, next) {
		try {
			const result = await this.service.detail(req.params.id);
			return res.status(statusCode.SUCCESS_CODE).json(result);
		} catch (e) {
			handleError(e, res);
		}
	}

	async insert(req, res, next) {
		try {
			const createdModel = await this.service.insert(req.body);
			return res
				.status(statusCode.CREATED_CODE)
				.json({ msg: messageConst.INSERT_SUCCESS, content: createdModel });
		} catch (e) {
			handleError(e, res);
		}
	}

	async batchInsert(req, res, next) {
		try {
			await this.service.batchInsert(req.body);
			return res.status(statusCode.CREATED_CODE).json({ msg: messageConst.BATCH_INSERT_SUCCESS });
		} catch (e) {
			handleError(e, res);
		}
	}

	async update(req, res, next) {
		try {
			await this.service.update(req.body, { id: req.params.id });
			return res.status(statusCode.CREATED_CODE).json({ msg: messageConst.UPDATE_SUCCESS });
		} catch (e) {
			handleError(e, res);
		}
	}

	async delete(req, res, next) {
		try {
			await this.service.delete({ id: req.params.id });
			return res
				.status(statusCode.DELETED_CODE)
				.json({ msg: messageConst.DELETE_SUCCESS, deleted_id: req.params.id });
		} catch (e) {
			handleError(e, res);
		}
	}
}

module.exports = BaseController;
