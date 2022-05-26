const { User, sequelize, Manifest, Permission, UserRefManifest } = require('../models/index.model');
const BaseService = require('./base.service');
const md5 = require('md5');
const jwtModel = require('../models/jwt.util-model');
const { sendMail, parseResetPassTemplate } = require('../config/mail.config');
const { v4 } = require('uuid');
const { functionReturnCode } = require('../constant');
const { Op } = require('sequelize');

class UserService extends BaseService {
	constructor() {
		super(User);
	}

	async detail(id) {
		return User.findByPk(id, {
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active'] },
			include: {
				model: Manifest,
				attributes: ['id', 'role_name', 'content'],
				include: {
					model: Permission,
					attributes: ['id', 'name'],
					through: {
						attributes: [],
					},
				},
				through: {
					attributes: [],
				},
			},
		});
	}

	async addManifest(req) {
		const { userId, arrManifestId } = req.body;
		const user = await User.findByPk(userId);
		if (!user) return functionReturnCode.NOT_FOUND;
		const listManifest = Manifest.findAll({
			where: {
				id: {
					[Op.in]: arrManifestId,
				},
			},
		});
		if ((await listManifest).length !== arrManifestId.length) return functionReturnCode.NOT_FOUND;
		return UserRefManifest.bulkCreate(
			arrManifestId.map((manifest) => ({
				user_id: userId,
				manifest_id: manifest,
			})),
		);
	}

	async login(req) {
		return User.findOne({
			where: { ...req.body, password: md5(req.body?.password), is_active: 1 },
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active'] },
			include: {
				model: Manifest,
				attributes: ['id', 'role_name', 'content'],
				include: {
					model: Permission,
					attributes: ['id', 'name'],
					through: {
						attributes: [],
					},
				},
				through: {
					attributes: [],
				},
			},
		});
	}

	async updatePassword(req) {
		const id = req.id;
		const user = await this.findOne({ id });
		if (md5(req.body?.oldPassword) === user.password) {
			return this.update({ ...user, password: md5(req.body?.newPassword) }, { id });
		} else return null;
	}

	async resetPassword(req) {
		const { email } = req.body;
		const user = await this.findOne({ email });
		if (user) {
			const passWordReset = v4();
			const tokenReset = jwtModel.genKeyResetPass(user, passWordReset);
			try {
				await this.update({ ...user, token_reset_pw: tokenReset }, { id: user.id });
				const mailContent = await parseResetPassTemplate(
					`${
						process.env.STATUS === 'development' ? 'http://localhost:3001' : process.env.APP_SERVER_URL
					}/user/reset-password/${tokenReset}`,
					passWordReset,
				);
				await sendMail(email, 'Xác nhận sử dụng tính năng quên mật khẩu', mailContent);
				return functionReturnCode.SUCCESS;
			} catch (e) {
				console.log(e);
				return functionReturnCode.CATCH_ERROR;
			}
		} else {
			return functionReturnCode.NOT_FOUND;
		}
	}

	async confirmResetPass(req) {
		const { tokenReset } = req.params;
		const { newPass, exp, id } = await jwtModel.verify(tokenReset);
		if (new Date().getTime() / 1000 > exp) {
			return functionReturnCode.EXPIRED;
		}
		const user = await this.findOne({ token_reset_pw: tokenReset, id });
		if (!user) {
			return functionReturnCode.NOT_FOUND;
		} else {
			try {
				this.update({ password: md5(newPass) }, { id });
				return functionReturnCode.SUCCESS;
			} catch (e) {
				return functionReturnCode.CATCH_ERROR;
			}
		}
	}
}

module.exports = new UserService();
