module.exports = {
	HOST: process.env.MYSQL_HOST,
	USER: process.env.MYSQL_USER,
	PASSWORD: process.env.MYSQL_PASSWORD,
	DB: process.env.MYSQL_DB,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 60000,
		idle: 10000,
	},
	dialectOptions: {
		useUTC: false,
		dateStrings: true,
		typeCast: true,
	},
	timezone: '+07:00',
};
