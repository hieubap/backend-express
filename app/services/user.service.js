const { User, sequelize, Manifest, Permission, UserType } = require('../models/index.model');
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

	async insert(userType, req, res) {
		const t = await sequelize.transaction();
		try {
			const user = { ...req.body, password: md5(req.body?.password) };
			user.user_type_id = userType;
			delete user.manifests;
			delete user.system_default;
			if (req.id) {
				user.created_id = req.id;
			}
			const createdUser = await User.create(user, { transaction: t });
			if (req.body.manifests) {
				const listManifest = await Manifest.findAll({
					where: {
						id: {
							[Op.in]: req.body.manifests || [],
						},
						user_type_id: createdUser.user_type_id,
					},
				});
				createdUser.setManifests(listManifest);
			}

			await t.commit();
			return functionReturnCode.SUCCESS;
		} catch (e) {
			await t.rollback();
			handleError(e, res);
			return functionReturnCode.CATCH_ERROR;
		}
	}

	async update(userType, req, res) {
		const t = await sequelize.transaction();
		try {
			const user = { ...req.body };
			delete user.manifests;
			delete user.password;
			delete user.email;
			delete user.user_type_id;
			delete user.system_default;
			if (req.id) {
				user.updated_id = req.id;
			}
			// cho phep update ca user ko active
			const oldUser = await User.scope('notDeleted', 'notSystemDefault').findByPk(req.params.id, {
				where: { user_type_id: userType },
			});
			if (!oldUser) {
				await t.rollback();
				return functionReturnCode.NOT_FOUND;
			}
			await User.scope(null).update(
				{ ...user },
				{
					where: {
						id: +req.params.id,
					},
					transaction: t,
				},
			);
			if (req.body.manifests) {
				const updatedUser = await User.scope('notDeleted').findByPk(req.params.id);
				const manifests = await Manifest.findAll({
					where: {
						id: {
							[Op.in]: req.body.manifests || [],
						},
						user_type_id: userType,
					},
				});
				await updatedUser.setManifests(manifests);
			}
			await t.commit();
			return functionReturnCode.SUCCESS;
		} catch (e) {
			await t.rollback();
			handleError(e, res);
			return functionReturnCode.CATCH_ERROR;
		}
	}
	async updateSelf(req, res) {
		const user = { ...req.body };
		delete user.manifests;
		delete user.password;
		delete user.email;
		delete user.user_type_id;
		delete user.system_default;
		return User.update(user, { where: { id: req.params.id } });
	}
	async detail(userType, id) {
		return User.scope('notDeleted').findOne({
			where: { id, user_type_id: userType },
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active', 'user_type_id'] },
			include: [
				{
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
				{
					model: UserType,
					attributes: ['name', 'vi_name'],
				},
			],
		});
	}

	async delete(userType, id) {
		return User.destroy({ where: { id, user_type_id: userType } });
	}

	search(options, page = 1, size = 10, userId) {
		return this.model.scope(null).findAndCountAll({
			where: { ...options, id: { [Op.ne]: userId || -1 } },
			offset: (+page - 1) * size,
			limit: size,
			order: [['updated_at', 'ASC']],
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at'] },
		});
	}

	async login(req) {
		return User.scope(['notDeleted', 'active']).findOne({
			where: { email: req.body?.email, password: md5(req.body?.password) },
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active'] },
			include: {
				model: Manifest,
				attributes: ['id', 'role_name', 'content'],
				include: {
					model: Permission,
					attributes: ['id', 'name', 'vi_name'],
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

	async info(id) {
		return User.scope('notDeleted').findOne({
			where: { id },
			attributes: { exclude: ['token', 'token_reset_pw', 'password', 'deleted_at', 'is_active'] },
			include: {
				model: Manifest,
				attributes: ['id', 'role_name', 'content'],
				include: {
					model: Permission,
					attributes: ['id', 'name', 'vi_name'],
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
