const { Router } = require('express');
const { Data, sequelize } = require('../models/index.model');

const router = (app) => {
	const router = Router();
	app.use("/data", router);
	
	router.post('', async (req, res, next) => {
		const t = await sequelize.transaction();
		const existedData = await Data.findOne({
			where: {
				hash: req.body.hash,
			},
		});
		if (!existedData) {
			const dataModel = await Data.create(req.body, { transaction: t });
			await t.commit();
			res.json({
				message: 'success',
				data: dataModel,
			});
		} else {
			res.json({
				message: 'success',
				data: existedData,
			});
		}
	});
	router.get('/all', async (req, res, next) => {
		const dataModel = await Data.findAll();
		res.json({
			message: 'success',
			data: dataModel,
		});
	});
	router.get('/:hash', async (req, res, next) => {
		if (!req.params.hash)
			res.json({
				code: 1,
				message: 'hash is not exactly',
			});
		else {
			const dataModel = await Data.findOne({
				where: {
					hash: req.params.hash,
				},
			});
			res.json({
				message: 'success',
				data: dataModel,
			});
		}
	});
	router.get('', async (req, res, next) => {
		console.log(req.query.ids, 'req.params???');
		if (!req.query.ids || !req.query.ids?.length)
			res.json({
				code: 1,
				message: 'hash is not exactly',
			});
		else {
			const dataModel = await sequelize.query(
				'SELECT * FROM data WHERE hash in(' +
					req.query.ids
						.split(',')
						.map((i) => "'" + i + "'")
						.join(',') +
					')',
			);
			res.json({
				message: 'success',
				data: dataModel[0],
			});
		}
	});
};
module.exports = router;
