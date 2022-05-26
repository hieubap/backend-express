const config = require('../config/db.config.js');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	logging: false,
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
	User: require('./user.model')(sequelize),
	Manifest: require('./manifest.model')(sequelize),
	Permission: require('./permission.model')(sequelize),

	testConnect: async () => {
		try {
			await db.sequelize.authenticate();
			console.log('Connection has been established successfully.');
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	},
	sync: () => sequelize.sync({ alter: true }), // this will create if not exist model in db
};

// define association between all model
const { User, Manifest, Permission } = db;
User.belongsToMany(Manifest, {
	through: 'user_ref_manifest',
	foreignKey: 'user_id',
	otherKey: 'manifest_id',
});
Manifest.belongsToMany(Permission, {
	through: 'manifest_ref_permission',
	foreignKey: 'manifest_id',
	otherKey: 'permission_id',
});
Permission.belongsToMany(Manifest, {
	through: 'manifest_ref_permission',
	otherKey: 'manifest_id',
	foreignKey: 'permission_id',
});

module.exports = db;
