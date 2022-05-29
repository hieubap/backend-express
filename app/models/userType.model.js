const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class UserType extends Model {}

	UserType.init(
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(),
			},
			vi_name: DataTypes.STRING(),
			is_active: DataTypes.TINYINT(),
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'UserType',
			tableName: 'user_type',
		},
	);
	return UserType;
};
