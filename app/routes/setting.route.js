const { Router } = require('express');
const { Setting, sequelize } = require('../models/index.model');
const crypto = require('crypto-js');
const moment = require('moment');
const { authMiddle, config } = require('./utils');
const router = (app) => {
	const router = Router();
	app.use('/cai-dat', router);

	router.post('/dang-nhap', async (req, res, next) => {
		const { value: username } = await Setting.findOne({
			where: {
				key: 'username',
			},
		});
		const { value: password } = await Setting.findOne({
			where: {
				key: 'password',
			},
		});
		console.log(username);
		if (username && password) {
			if (username?.toLowerCase() === req.body.username?.toLowerCase() && password === req.body.password) {
				res.json({
					code: 0,
					message: 'success',
					data: {
						token: crypto.AES.encrypt(moment().add(2, 'hour').format(), config.key).toString(),
					},
				});
			} else {
				res.json({
					code: 400,
					message: 'username or password not correct',
				});
			}
		} else {
			res.json({
				code: 400,
				message: 'login fail',
			});
		}
	});
	router.get('/thiet-lap', async (req, res, next) => {
		const dataModel = await Setting.findAll();
		res.json({
			code: 0,
			message: 'success',
			data: dataModel.filter((i) => !['username', 'password'].includes(i.key)),
		});
	});
	router.post('/thay-doi', authMiddle, async (req, res, next) => {
		const keys = Object.keys(req.body).filter((i) => !['username', 'password'].includes(i.key));
		try {
			for (let i = 0; i < keys.length; i++) {
				const existedData = await Setting.findOne({
					where: {
						key: keys[i],
					},
				});
				if (!existedData) {
					const t = await sequelize.transaction();
					await Setting.create({ key: keys[i], value: req.body[keys[i]] }, { transaction: t });
					await t.commit();
				} else {
					await Setting.update(
						{ value: req.body[keys[i]] },
						{
							where: {
								key: keys[i],
							},
						},
					);
				}
			}
			res.json({
				code: 0,
				message: 'success',
			});
		} catch (e) {
			res.json({
				code: 500,
				message: 'Có lỗi xảy ra',
				detail: e?.toString(),
			});
		}
	});
};
module.exports = { router };
