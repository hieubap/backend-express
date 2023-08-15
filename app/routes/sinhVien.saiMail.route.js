const nodemailer = require('nodemailer');
const { Router } = require('express');
const { SinhVien, sequelize, Setting, SinhVienSaiMail } = require('../models/index.model');
const readFileExcel = require('read-excel-file/node');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { authMiddle, config } = require('./utils');
const moment = require('moment');
const { Op } = require('sequelize');
console.log(path.resolve(__dirname, ``), 'path----');
const verifyHtml = fs.readFileSync(path.resolve(__dirname, `../static/ticket2.html`));

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	// secure: false,
	auth: {
		user: config.userEmail,
		pass: config.passEmail,
	},
});

const router = (app) => {
	const router = Router();
	app.use('/sinh-vien-sai-mail', router);
	router.post('/thay-doi', async (req, res, next) => {
		try {
			if (!req.body) {
				res.json({
					code: 400,
					message: 'please enter body (email,ho_ten,sdt)',
				});
				return;
			}
			const existedData = await SinhVien.findOne({
				where: {
					sdt: req.body.sdt + '',
				},
			});
			if (existedData) {
				const dataModel = await SinhVienSaiMail.findOne({
					where: {
						sdt: req.body.sdt + '',
					},
				});
				if (!dataModel) {
					const t = await sequelize.transaction();
					const dataModel2 = await SinhVienSaiMail.create(req.body, { transaction: t });
					await t.commit();
				} else {
					await SinhVienSaiMail.update(req.body, {
						where: {
							sdt: req.body.sdt + '',
						},
					});
				}

				res.json({
					code: 0,
					message: 'success',
				});
			} else {
				res.json({ code: 400, message: 'Bạn không có trong danh sách' });
			}
		} catch (error) {
			res.json({
				code: 500,
				message: error?.message,
			});
		}
	});
	router.get('/toan-bo', async (req, res, next) => {
		const dataModel = await SinhVien.findAll();
		res.json({
			code: 0,
			data: dataModel,
		});
	});
};
module.exports = { router, config };
