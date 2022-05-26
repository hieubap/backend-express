const userService = require('../services/user.service');
const BaseController = require('./base.controller');
const { handleError } = require('../services/handleError.util-service');
const jwtUtilModel = require('../models/jwt.util-model');
const { Manifest, Permission } = require('../models/index.model');
const { messageConst, statusCode, functionReturnCode } = require('../constant');
const md5 = require('md5');
const { sendMail, resetPassTemplate } = require('../config/mail.config');
const jwtModel = require('../models/jwt.util-model');

const {
	SERVER_ERROR_CODE,
	BAD_REQUEST_CODE,
	SUCCESS_CODE,
	NOT_FOUND_CODE,
	CREATED_CODE,
	DELETED_CODE,
	NOT_AUTHEN_CODE,
	NOT_AUTHOR_CODE,
} = statusCode;
const { CATCH_ERROR, EXPIRED, NOT_FOUND, SUCCESS, VOID } = functionReturnCode;

class UserController extends BaseController {
	constructor() {
		super(userService);
	}

	async insert(req, res, next) {
		try {
			const user = { ...req.body, password: md5(req.body?.password) };
			if (req.id) {
				user.created_id = req.id;
			}
			const createdModel = await this.service.insert(user);
			return res
				.status(statusCode.CREATED_CODE)
				.json({ msg: messageConst.INSERT_SUCCESS, content: createdModel });
		} catch (e) {
			handleError(e, res);
		}
	}

	async login(req, res, next) {
		try {
			const result = await userService.login(req);
			if (result) {
				return res.status(SUCCESS_CODE).json({ data: result, token: jwtUtilModel.genKey(result) });
			}
			return res.status(BAD_REQUEST_CODE).send({ msg: messageConst.BAD_CRIDENTAL });
		} catch (e) {
			handleError(e, res);
		}
	}

	async updateSelf(req, res, next) {
		if (isNaN(req.params.id)) {
			res.status(BAD_REQUEST_CODE).send({ msg: messageConst.BAD_PARAMETER });
		}
		if (req.body.password) {
			delete req.body.password;
		}
		return this.update(req, res, next);
	}

	async addManifest(req, res, next) {
		if (isNaN(req.body.userId)) {
			res.status(BAD_REQUEST_CODE).send({ msg: messageConst.BAD_PARAMETER });
		}
		try {
			const result = await this.service.addManifest(req);
			if (result === functionReturnCode.NOT_FOUND) {
				return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.NOT_FOUND });
			}
			return res.status(statusCode.CREATED_CODE).json({ msg: messageConst.BATCH_INSERT_SUCCESS });
		} catch (e) {
			handleError(e, res);
		}
	}

	async changePassword(req, res, next) {
		if (!req.body?.oldPassword || !req.body?.newPassword) {
			return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.BAD_PARAMETER });
		}
		try {
			const result = await this.service.updatePassword(req);
			if (result) {
				return res.status(SUCCESS_CODE).json({ msg: messageConst.UPDATE_PASSWORD_SUCCESS });
			} else {
				return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.PASSWORD_WRONG });
			}
		} catch (e) {
			handleError(e, res);
		}
	}

	async forgotPassword(req, res, next) {
		if (!req.body?.email) {
			return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.BAD_PARAMETER });
		}
		try {
			const result = await this.service.resetPassword(req);
			if (result === SUCCESS) {
				return res.status(SUCCESS_CODE).json({ status: 'ok', msg: messageConst.RESET_PASSWORD_SUCCESS });
			}
			if (result === NOT_FOUND) {
				return res.status(BAD_REQUEST_CODE).json({ msg: messageConst.NOT_FOUND });
			}
			if (result === CATCH_ERROR) {
				return res.status(SERVER_ERROR_CODE).json({ msg: messageConst.SERVER_ERROR });
			}
		} catch (e) {
			handleError(e, res);
		}
	}

	async confirmResetPw(req, res, next) {
		try {
			const result = await userService.confirmResetPass(req);
			if (result === SUCCESS) {
				return res.redirect(process.env.APP_CLIENT_URL);
			}
			if (result === EXPIRED) {
				res.set('Content-Type', 'text/html');
				return res.send(Buffer.from('<h1>Xin lỗi phiên làm việc của bạn đã hết hạn</h1>'));
			}
			if ([NOT_FOUND, CATCH_ERROR].includes(result)) {
				res.set('Content-Type', 'text/html');
				return res.send(Buffer.from('<h1>Đã xảy ra lỗi</h1>'));
			}
		} catch (e) {
			handleError(e, res);
		}
	}
}

module.exports = new UserController();
