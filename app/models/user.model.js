const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class User extends Model {}
	User.init(
		{
			name: {
				type: DataTypes.STRING(20),
			},
			full_name: {
				type: DataTypes.STRING(255),
			},
			phone_number: {
				type: DataTypes.STRING(20),
			},
			email: {
				type: DataTypes.STRING(255),
			},
			password: {
				type: DataTypes.STRING(50),
			},
			contact: {
				type: DataTypes.STRING(255),
			},
			address_id: {
				type: DataTypes.INTEGER,
			},
			avatar: {
				type: DataTypes.STRING(255),
			},
			note: {
				type: DataTypes.STRING(255),
			},
			manifest_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'user',
			tableName: 'user',
		},
	);
	return User;
};
