const nodemailer = require('nodemailer');
const { Router } = require('express');
const { SinhVien, sequelize, Setting } = require('../models/index.model');
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
	app.use('/sinh-vien', router);
	router.post('/send-email', authMiddle, async (req, res, next) => {
		if (!req.body?.ids?.length) {
			res.json({
				code: 400,
				message: 'please enter ids (type array)',
			});
			return;
		}
		const dsThietLap = await Setting.findAll();
		const thietLapHeThong = {};
		for (let i = 0; i < dsThietLap.length; i++) {
			thietLapHeThong[dsThietLap[i].key] = dsThietLap[i].value;
		}
		const batDau = moment(thietLapHeThong.batDau);
		const ketThuc = moment(thietLapHeThong.ketThuc);
		try {
			for (let i = 0; i < req.body?.ids?.length; i++) {
				const studentRecord = await SinhVien.findOne({
					where: {
						id: req.body?.ids[i],
					},
				});
				const html = verifyHtml
					.toString()
					.replace(
						'{{ten_su_kien}}',
						thietLapHeThong.tenSuKien || 'Galadinner tốt nghiệp điện tử viễn thông K63',
					)
					.replace('{{ngay}}', batDau.format('DD') || '16')
					.replace('{{thoi_gian_1}}', batDau.format('ddd, MMM DD') || 'Wed, Aug 16')
					.replace(
						'{{thoi_gian_2}}',
						batDau.format('HH:mm') + ' to ' + ketThuc.format('HH:mm') + ' GMT+7' ||
							'7:00 PM to 9:00 PM GMT+7',
					)
					.replace('{{dia_diem_1}}', thietLapHeThong.toaNha || 'Dai hoc BK Hanoi')
					.replace('{{dia_diem_2}}', thietLapHeThong.diaDiem || 'Wd, Hà nội')
					.replace('{{url_my_ticket}}', config.urlTicket + studentRecord.id)
					.replace('{{url_map}}', thietLapHeThong.urlMap)
					.replace('{{url_event}}', thietLapHeThong.urlEvent);
				if (studentRecord && studentRecord.emails) {
					const emails = JSON.parse(studentRecord.emails) || [];
					for (let i = 0; i < emails.length; i++) {
						await transporter.sendMail(
							{
								from: config.userEmail,
								to: emails[i],
								subject: thietLapHeThong.emailTitle || 'TICKET GALADINNER',
								html,
							},
							(error) => {
								if (error) {
									console.log(error, 'error?');
									// reject(error);
									res.json({
										message: error?.toString(),
									});
								} else {
									res.json({
										code: 0,
										message: 'success',
									});
									console.log(error, 'error?');
									// resolve(true);
								}
							},
						);
					}
				}
			}
		} catch (e) {
			res.json({
				code: 500,
				message: e?.toString() || 'Error orcur',
			});
		}
	});
	router.get('/chi-tiet/:id', async (req, res, next) => {
		try {
			const data = await SinhVien.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.json({
				code: 0,
				data,
			});
		} catch (error) {
			res.json({
				code: 500,
				message: error?.message,
			});
		}
	});
	router.post('/cap-nhat-so-luot', authMiddle, async (req, res, next) => {
		try {
			if (!req.body?.ids?.length) {
				res.json({
					code: 400,
					message: 'please enter ids (type array)',
				});
				return;
			}
			const lists = [];

			for (let i = 0; i < req.body.ids.length; i++) {
				const sv = req.body.ids[i];
				const existedData = await SinhVien.findOne({
					where: {
						id: sv + '',
					},
				});
				if (existedData) {
					lists.push(sv);
				}
			}
			const t = await sequelize.transaction();
			await SinhVien.update(
				{ soLuot: req.body.soLuot },
				{
					transaction: t,
					where: {
						id: {
							[Op.in]: lists.map((i) => i - 0),
						},
					},
				},
			);
			await t.commit();
			res.json({ code: 0, message: 'success' });
		} catch (error) {
			res.json({
				code: 500,
				message: error?.message,
			});
		}
	});
	router.post('/cap-nhat-danh-sach-2', async (req, res, next) => {
		try {
			if (!req.body?.data?.length) {
				res.json({
					code: 400,
					message: 'please enter data (type array)',
				});
				return;
			}
			const lists = {};

			for (let i = 0; i < req.body.data.length; i++) {
				const sv = req.body.data[i];
				const existedData = await SinhVien.findOne({
					where: {
						sdt: sv.sdt + '',
					},
				});
				if (!existedData) {
					if (!lists[sv.sdt]) {
						lists[sv.sdt] = sv;
						lists[sv.sdt].emails = [sv.email];
					} else {
						lists[sv.sdt].emails.push(sv.email);
					}
				} else {
					if (JSON.parse(existedData.emails).includes(sv.email)) {
					} else if (!lists[sv.sdt]) {
						lists[sv.sdt] = existedData;
						lists[sv.sdt].emails = JSON.parse(existedData.emails);
					} else {
						lists[sv.sdt].emails.push(sv.email);
					}
				}
			}
			const t = await sequelize.transaction();
			await SinhVien.bulkCreate(
				Object.values(lists).map((i) => ({
					...i,
					emails: JSON.stringify(Array.from(new Set(i.emails))),
					soLuot: i.soLuot || 1,
				})),
				{ transaction: t },
			);
			await t.commit();
			res.json({ code: 0, message: 'success' });
		} catch (error) {
			res.json({
				code: 500,
				message: error?.message,
			});
		}
	});
	router.post('/cap-nhat-danh-sach', async (req, res, next) => {
		try {
			if (!req.body?.data?.length) {
				res.json({
					code: 400,
					message: 'please enter data (type array)',
				});
				return;
			}

			for (let i = 0; i < req.body.data.length; i++) {
				const existedData = await SinhVien.findOne({
					where: {
						sdt: req.body.data[i].sdt + '',
					},
				});
				if (!existedData) {
					const t = await sequelize.transaction();
					await SinhVien.create(req.body.data[i], { transaction: t });
					await t.commit();
					// res.json({
					// 	message: 'success',
					// 	data: dataModel,
					// });
				}
			}
			res.json({ code: 0, message: 'success' });
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
	router.post('/check-in/:id', authMiddle, async (req, res, next) => {
		const dataModel = await SinhVien.findOne({
			where: {
				id: req.params.id,
			},
		});

		const newChecks = [...(dataModel.checks ? JSON.parse(dataModel.checks) : []), moment().format()];

		if (newChecks.length > dataModel.soLuot) {
			res.json({
				code: 400,
				message: 'Đã vượt quá giới hạn check in',
			});
		}

		const data = await SinhVien.update(
			{ checks: JSON.stringify(newChecks) },
			{
				where: {
					id: req.params.id,
				},
			},
		);
		res.json({
			code: 0,
			message: 'success',
			data,
		});
	});
};
module.exports = { router, config };
