const { router: settingRouter } = require('./setting.route');
const { router: sinhVienRoute } = require('./sinhVien.route');
const { Router } = require('express');

const allAppRoute = (app) => {
	settingRouter(app);
	sinhVienRoute(app);
};

module.exports = { allAppRoute };
