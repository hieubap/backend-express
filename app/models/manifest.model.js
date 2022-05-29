const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class Manifest extends Model {}

	Manifest.init(
		{
			role_name: DataTypes.STRING(20),
			content: DataTypes.STRING(100),
			is_active: {
				type: DataTypes.TINYINT,
				defaultValue: 1,
			},
			user_type_id: {
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
			modelName: 'Manifest',
			tableName: 'manifest_authen',
		},
	);
	return Manifest;
};
