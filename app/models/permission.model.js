const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class Permission extends Model {}

	Permission.init(
		{
			name: DataTypes.STRING(50),
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'Permission',
			tableName: 'permission',
		},
	);
	return Permission;
};
