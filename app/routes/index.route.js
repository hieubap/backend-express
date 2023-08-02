const dataRouter = require('./data.route');
const { Router } = require('express');

const allAppRoute = (app) => {
	dataRouter(app);
};

module.exports = { allAppRoute };
