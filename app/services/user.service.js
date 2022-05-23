const { User, sequelize, Manifest, Permission } = require('../models/index.model');
const BaseService = require('./base.service');
const md5 = require('md5');

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
}

module.exports = new UserService();
