const { router: settingRouter } = require('./setting.route');
const { router: sinhVienRoute } = require('./sinhVien.route');
const { router: sinhVienSaiMailRoute } = require('./sinhVien.saiMail.route');
const { Router } = require('express');

const allAppRoute = (app) => {
	settingRouter(app);
	sinhVienRoute(app);
	sinhVienSaiMailRoute(app);
};

module.exports = { allAppRoute };
