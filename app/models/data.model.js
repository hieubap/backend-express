const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
	class Data extends Model {}

	Data.init(
		{
			value: {
				type: DataTypes.STRING(),
			},
			name: {
				type: DataTypes.STRING(),
			},
			content: {
				type: DataTypes.STRING(),
			},
			hash: {
				type: DataTypes.STRING(),
			},
			upload_by: {
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
			modelName: 'Data',
			tableName: 'data',
		},
	);
	return Data;
};
