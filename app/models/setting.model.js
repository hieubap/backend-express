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
			timestamps: false,
			paranoid: true,
			// createdAt: 'created_at',
			// updatedAt: 'updated_at',
			// deletedAt: 'deleted_at',
			sequelize,
			modelName: 'CaiDat',
			tableName: 'cai_dat',
		},
	);
	return Setting;
};
