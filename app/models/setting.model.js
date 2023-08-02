const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class Setting extends Model {}

	Setting.init(
		{
			key: {
				type: DataTypes.STRING(),
			},
			value: {
				type: DataTypes.STRING(),
			},
		},
		{
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			sequelize,
			modelName: 'SinhVien',
			tableName: 'sinh_vien',
		},
	);
	return Setting;
};
