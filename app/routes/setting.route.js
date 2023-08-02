const { Router } = require('express');
const { Setting, sequelize } = require('../models/index.model');

const router = (app) => {
	const router = Router();
	app.use('/cai-dat', router);

	router.post('/dang-nhap', async (req, res, next) => {
		const t = await sequelize.transaction();
		const username = await Setting.findOne({
			where: {
				key: 'username',
			},
		});
		const password = await Setting.findOne({
			where: {
				key: 'password',
			},
		});
		if (username && password) {
			// const dataModel = await Data.create(req.body, { transaction: t });
			// await t.commit();
			res.json({
				message: 'success',
				data: {
					token: '',
				},
			});
		} else {
			res.json({
				message: 'login fail',
			});
		}
	});
	router.get('/thiet-lap', async (req, res, next) => {
		const dataModel = await Setting.findAll();
		res.json({
			message: 'success',
			data: dataModel,
		});
	});
};
module.exports = router;
