const config = require('../config/db.config.js');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	logging: console.log,
	// logging: false,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
	dialectOptions: config.dialectOptions,
	timezone: config.timezone,
});
const db = {
	Sequelize,
	sequelize,
	Data: require('./data.model')(sequelize),
};

module.exports = db;
