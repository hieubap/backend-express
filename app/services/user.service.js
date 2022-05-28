const { User, sequelize, Manifest, Permission, UserRefManifest } = require('../models/index.model');
const BaseService = require('./base.service');
const md5 = require('md5');
const jwtModel = require('../models/jwt.util-model');
const { sendMail, parseResetPassTemplate } = require('../config/mail.config');
const { v4 } = require('uuid');
const { functionReturnCode } = require('../constant');
const { Op } = require('sequelize');
const { handleError } = require('./handleError.util-service');

class UserService extends BaseService {
	constructor() {
		super(User);
	}

	async insert(req, res) {
		const transaction = await sequelize.transaction();
		try {
			const user = { ...req.body, password: md5(req.body?.password) };
			delete user.manifests;
			if (req.id) {
				user.created_id = req.id;
			}
			const createdModel = await User.create(user);
			// them vao junction table
			const manifests = req.body.manifests || [];
			if (manifests.length !== 0) {
				const listManifest = await Manifest.findAll({
					where: {
						id: {
							[Op.in]: manifests,
						},
					},
				});
				if (listManifest.length !== manifests.length) {
					return functionReturnCode.NOT_FOUND;
				}
				await UserRefManifest.bulkCreate(
					manifests.map((manifest) => ({
						user_id: createdModel.id,
						manifest_id: manifest,
						created_id: req.id,
					})),
				);
			}
			await transaction.commit();
			return functionReturnCode.SUCCESS;
		} catch (e) {
			await transaction.rollback();
			handleError(e, res);
			return functionReturnCode.CATCH_ERROR;
		}
	}

	async update(req, res) {
		const transaction = await sequelize.transaction();
		try {
			const user = { ...req.body };
			delete user.manifests;
			delete user.password;
			delete user.email;
			if (req.id) {
				user.updated_id = req.id;
			}
			// cho phep update ca user ko active
			const oldUser = await User.scope('notDeleted').findByPk(req.params.id);
			if (!oldUser) {
				await transaction.rollback();
				return functionReturnCode.NOT_FOUND;
			}
			await User.scope(null).update(
				{ ...user },
				{
					where: {
						id: +req.params.id,
					},
				},
			);
			const manifests = req.body.manifests || [];
			if (manifests.length) {
				await UserRefManifest.destroy({
					where: { user_id: req.params.id },
				});
				await UserRefManifest.bulkCreate(
					manifests.map((item) => ({
						user_id: req.params.id,
						manifest_id: item,
						created_id: req.id,
					})),
				);
			}
			await transaction.commit();
			return functionReturnCode.SUCCESS;
		} catch (e) {
			await transaction.rollback();
			handleError(e, res);
			return functionReturnCode.CATCH_ERROR;
		}
	}

	async detail(id) {
		return User.scope('notDeleted').findByPk(id, {
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

	async login(req) {
		return User.findOne({
			where: { email: req.body?.email, password: md5(req.body?.password) },
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
