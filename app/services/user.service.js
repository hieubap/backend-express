const { User, sequelize, Manifest, Permission } = require('../models/index.model');
const BaseService = require('./base.service');
const md5 = require('md5');
const jwtModel = require('../models/jwt.util-model');
const { sendMail, resetPassTemplate } = require('../config/mail.config');
const { v4 } = require('uuid');
const jwtUtilModel = require('../models/jwt.util-model');
const { returnReturnCode, functionReturnCode } = require('../constant');

class UserService extends BaseService {
	constructor() {
		super(User);
	}

	getFullInfo(req) {}

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
				await sendMail(
					email,
					'Xác nhận sử dụng tính năng quên mật khẩu',
					'<h1>hello world</h1>',
					// resetPassTemplate(
					// 	`${
					// 		process.env.STATUS === 'development' ? 'http://localhost:3001' : process.env.SERVER_URL
					// 	}/reset-password/${tokenReset}`,
					// 	passWordReset,
					// ),
				);
				return returnReturnCode.SUCCESS;
			} catch (e) {
				console.log(e);
				return returnReturnCode.CATCH_ERROR;
			}
		} else {
			return returnReturnCode.NOT_FOUND_CODE;
		}
	}

	async confirmResetPass(req) {
		const { tokenRest } = req.params;
		const { newPass, exp, id } = await jwtModel.verify(tokenRest);
		if (new Date().getTime() / 1000 > exp) {
			return functionReturnCode.EXPIRED;
		}
		const user = await this.findOne({ token_reset_pw: newPass, id });
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
