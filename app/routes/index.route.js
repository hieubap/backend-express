const dataRouter = require('./data.route');
const sinhVienRoute = require('./sinhVien.route');
const { Router } = require('express');

const allAppRoute = (app) => {
	dataRouter(app);
	sinhVienRoute(app);
};

module.exports = { allAppRoute };
