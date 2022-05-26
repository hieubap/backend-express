const { User, sequelize, Manifest, Permission } = require('../models/index.model');
const BaseService = require('./base.service');
const md5 = require('md5');
const jwtModel = require('../models/jwt.util-model');
const { sendMail, parseResetPassTemplate } = require('../config/mail.config');
const { v4 } = require('uuid');
const { functionReturnCode } = require('../constant');

class UserService extends BaseService {
	constructor() {
		super(User);
	}

	getFullInfo(req) {}

	async detail(id) {
		return User.findByPk(id, {
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active'] },
		});
	}

	async addManifest(req) {
		return User.findByPk(req.body.userId)
			.then((user) => {
				if (!user) {
					console.log('User not found!');
					return null;
				}
				return Manifest.findByPk(req.body.manifestId).then((manifest) => {
					if (!manifest) {
						console.log('Manifest not found!');
						return null;
					}
					user.addManifest(manifest);
					console.log(`>> added User id=${user.id} to Manifest id=${manifest.id}`);
					return user;
				});
			})
			.catch((err) => {
				console.log('>> Error while adding Manifest to User: ', err);
			});
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
